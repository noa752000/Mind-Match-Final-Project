import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

interface User {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  googleId?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  googleAccessToken: string | null;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/calendar');

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
            setIsAuthenticated(true);
          } else {
            const newUser: User = {
              userId: firebaseUser.uid,
              username: firebaseUser.email?.split('@')[0] || 'user',
              fullName: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              googleId: firebaseUser.uid,
            };
            await setDoc(userRef, {
              ...newUser,
              courses: [
                'sql', 'systems_analysis', 'oop', 'calculus1',
                'linear_algebra', 'html_fundamentals',
                'information_systems_economics', 'cyber_security'
              ],
              createdAt: new Date(),
            });
            setUser(newUser);
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setGoogleAccessToken(null);
        }
      } catch (error) {
        console.error('Auth state error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Store Google OAuth access token for Calendar API calls
      const credential = GoogleAuthProvider.credentialFromResult(result);
      setGoogleAccessToken(credential?.accessToken || null);

      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const newUser: User = {
          userId: firebaseUser.uid,
          username: firebaseUser.email?.split('@')[0] || 'user',
          fullName: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          googleId: firebaseUser.uid,
        };
        await setDoc(userRef, {
          ...newUser,
          courses: [
            'sql', 'systems_analysis', 'oop', 'calculus1',
            'linear_algebra', 'html_fundamentals',
            'information_systems_economics', 'cyber_security'
          ],
          createdAt: new Date(),
        });
        setUser(newUser);
      } else {
        setUser(userDoc.data() as User);
      }

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setGoogleAccessToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, googleAccessToken, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

interface User {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  googleId?: string;
  photoURL?: string;
  phone?: string;
  institution?: string;
  academicYear?: string;
  studentId?: string;
  selectedCourses?: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  googleAccessToken: string | null;
  loginWithGoogle: () => Promise<boolean>;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  registerWithEmail: (fullName: string, email: string, password: string) => Promise<boolean>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  addUserCourse: (courseId: string) => Promise<void>;
  removeUserCourse: (courseId: string) => Promise<void>;
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
          photoURL: firebaseUser.photoURL || '',
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

  const loginWithEmail = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      const code = error?.code as string;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        throw new Error('האימייל או הסיסמה שגויים. אנא נסי שוב.');
      } else if (code === 'auth/operation-not-allowed') {
        throw new Error('התחברות עם אימייל אינה מופעלת. אנא התחברי עם Google.');
      } else if (code === 'auth/too-many-requests') {
        throw new Error('יותר מדי ניסיונות כושלים. אנא נסי שוב מאוחר יותר.');
      } else if (code === 'auth/invalid-email') {
        throw new Error('כתובת האימייל אינה תקינה.');
      }
      throw new Error('אירעה שגיאה בהתחברות. אנא נסי שוב.');
    }
  };

  const registerWithEmail = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      await updateProfile(firebaseUser, { displayName: fullName });

      const newUser: User = {
        userId: firebaseUser.uid,
        username: email.split('@')[0],
        fullName,
        email,
      };

      const userRef = doc(db, 'users', firebaseUser.uid);
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
      return true;
    } catch (error: any) {
      const code = error?.code as string;
      if (code === 'auth/email-already-in-use') {
        throw new Error('כתובת האימייל כבר רשומה במערכת. אנא התחברי או השתמשי באימייל אחר.');
      } else if (code === 'auth/weak-password') {
        throw new Error('הסיסמה חלשה מדי. אנא בחרי סיסמה חזקה יותר.');
      } else if (code === 'auth/operation-not-allowed') {
        throw new Error('הרשמה עם אימייל אינה מופעלת. אנא הירשמי עם Google.');
      } else if (code === 'auth/invalid-email') {
        throw new Error('כתובת האימייל אינה תקינה.');
      }
      if (error?.message) throw error;
      throw new Error('אירעה שגיאה בהרשמה. אנא נסי שוב.');
    }
  };

  const addUserCourse = async (courseId: string): Promise<void> => {
    if (!user) return;
    const userRef = doc(db, 'users', user.userId);
    await updateDoc(userRef, { selectedCourses: arrayUnion(courseId) });
    setUser(prev => prev ? { ...prev, selectedCourses: [...(prev.selectedCourses || []), courseId] } : prev);
  };

  const removeUserCourse = async (courseId: string): Promise<void> => {
    if (!user) return;
    const userRef = doc(db, 'users', user.userId);
    await updateDoc(userRef, { selectedCourses: arrayRemove(courseId) });
    setUser(prev => prev ? { ...prev, selectedCourses: (prev.selectedCourses || []).filter(id => id !== courseId) } : prev);
  };

  const updateUserProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) return;
    const userRef = doc(db, 'users', user.userId);
    await setDoc(userRef, data, { merge: true });
    setUser(prev => prev ? { ...prev, ...data } : prev);
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
    <AuthContext.Provider value={{ isAuthenticated, user, loading, googleAccessToken, loginWithGoogle, loginWithEmail, registerWithEmail, updateUserProfile, addUserCourse, removeUserCourse, logout }}>
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

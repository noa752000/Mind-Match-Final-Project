import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // בדיקה אם המשתמש מחובר (מ-LocalStorage)
  useEffect(() => {
    const isLoggedOut = localStorage.getItem('isLoggedOut');
    
    // אם המשתמש עשה logout במפורש, לא נטען אוטומטית
    if (isLoggedOut === 'true') {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      // משתמש ברירת מחדל - הדס
      const defaultUser: User = {
        username: 'hadar',
        fullName: 'הדס לוי',
        email: 'hadar@student.ac.il',
      };
      setUser(defaultUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Demo: כל שם משתמש וסיסמה יעבדו
    // במציאות - כאן תהיה קריאה לשרת
    if (username && password) {
      // תמיד טען את הפרופיל של הדס
      const newUser: User = {
        username: 'hadar',
        fullName: 'הדס לוי',
        email: 'hadar@student.ac.il',
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.removeItem('isLoggedOut'); // הסר את דגל ההתנתקות
      return true;
    }
    return false;
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    // Demo: כל שם משתמש וסיסמה יעבדו
    // במציאות - כאן תהיה קריאה לשרת
    if (fullName && email && password) {
      const newUser: User = {
        username: email.split('@')[0],
        fullName: fullName,
        email: email,
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedOut', 'true');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
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
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthChecked: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


let globalLogout: (() => void) | null = null;

export const setGlobalLogout = (fn: () => void) => {
  globalLogout = fn;
};

export const triggerGlobalLogout = () => {
  if (globalLogout) {
    console.log("[AuthContext] triggerGlobalLogout() called");
    globalLogout();
  }
};

function isTokenValid(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return false;

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const { exp } = JSON.parse(jsonPayload);
    if (!exp) return false;

    return Date.now() < exp * 1000;
  } catch (e) {
    console.error("[AuthContext] Error parsing token:", e);
    return false;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  const logout = () => {
    console.log("[AuthContext] logout()");
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token && isTokenValid(token)) {
        try {
          await axios.get('/auth/verify');
          setIsAuthenticated(true);
        } catch (error) {
          console.log("[AuthContext] Token not valid on backend:", error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
      setIsAuthChecked(true);
    };

    checkToken();
  }, []);
  const login = (token: string) => {
    console.log("[AuthContext] login()");
    if (isTokenValid(token)) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

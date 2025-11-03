import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { authAPI, fetchCSRFToken } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Fetch CSRF token first
        await fetchCSRFToken();
        
        // Check if user is already authenticated
        const currentUser = await authAPI.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        // User not authenticated
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const user = await authAPI.login(username, password);
    setUser(user);
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
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

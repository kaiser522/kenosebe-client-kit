import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

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
    // In real implementation, check session with /api/me/
    // For demo, use mock data
    const mockUser: User = {
      id: 1,
      username: 'demo',
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@kenosabe.com',
      role: 'ADMIN',
      organization: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: 1,
      username,
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@kenosabe.com',
      role: 'ADMIN',
      organization: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser(mockUser);
  };

  const logout = async () => {
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

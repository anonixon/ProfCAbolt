import React, { createContext, useContext, ReactNode, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuth } from '../hooks/useAuth';
import { AuthError } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [error, setError] = useState<AuthError | null>(null);
  const auth = useAuth();

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError({ message: err.message });
    } else {
      setError({ message: 'An unexpected error occurred' });
    }
  };

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    try {
      clearError();
      await auth.login(email, password);
    } catch (err) {
      handleError(err);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      clearError();
      await auth.register(email, password);
    } catch (err) {
      handleError(err);
    }
  };

  const logout = async () => {
    try {
      clearError();
      await auth.logout();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        loading: auth.loading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
} 
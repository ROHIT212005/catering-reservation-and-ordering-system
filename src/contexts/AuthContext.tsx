
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types';
import { mockAuthService, mockFirestore } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser) {
      // Convert createdAt string to Date if needed
      const userWithDateCreatedAt = {
        ...currentUser,
        createdAt: typeof currentUser.createdAt === 'string' 
          ? new Date(currentUser.createdAt) 
          : currentUser.createdAt
      };
      setUser(userWithDateCreatedAt);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await mockAuthService.signInWithEmailAndPassword(email, password);
      const userWithDateCreatedAt = {
        ...result.user,
        createdAt: typeof result.user.createdAt === 'string' 
          ? new Date(result.user.createdAt) 
          : result.user.createdAt
      };
      setUser(userWithDateCreatedAt);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      console.log('User logged in successfully:', userWithDateCreatedAt);
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'admin' | 'user') => {
    try {
      setLoading(true);
      const result = await mockAuthService.createUserWithEmailAndPassword(email, password);
      
      // Create user profile with proper Date object
      const userData = {
        ...result.user,
        name,
        role,
        createdAt: new Date()
      };
      
      await mockFirestore.collection('users').add(userData);
      setUser(userData);
      
      toast({
        title: "Account created!",
        description: "Welcome to our catering platform.",
      });
      console.log('User registered successfully:', userData);
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await mockAuthService.signOut();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      console.log('User logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

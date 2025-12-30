import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContextType, User, AuthState} from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = '@auth_user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  // Load persisted user on app start
  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuthState({user, isLoading: false});
      } else {
        setAuthState({user: null, isLoading: false});
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
      setAuthState({user: null, isLoading: false});
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Simulate API call - in real app, this would be an actual API endpoint
      // For demo purposes, we'll check against stored users
      const storedUsers = await AsyncStorage.getItem('@app_users');
      const users: (User & {password: string})[] = storedUsers
        ? JSON.parse(storedUsers)
        : [];

      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object before storing
      const {password: _, ...userWithoutPassword} = user;
      const userToStore: User = userWithoutPassword;

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
      setAuthState({user: userToStore, isLoading: false});
    } catch (error) {
      throw error;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Validate password length
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists
      const storedUsers = await AsyncStorage.getItem('@app_users');
      const users: (User & {password: string})[] = storedUsers
        ? JSON.parse(storedUsers)
        : [];

      const existingUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: User & {password: string} = {
        id: Date.now().toString(),
        name,
        email: email.toLowerCase(),
        password,
      };

      users.push(newUser);
      await AsyncStorage.setItem('@app_users', JSON.stringify(users));

      // Remove password before storing in auth state
      const {password: _, ...userWithoutPassword} = newUser;
      const userToStore: User = userWithoutPassword;

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
      setAuthState({user: userToStore, isLoading: false});
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setAuthState({user: null, isLoading: false});
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user: authState.user,
    login,
    signup,
    logout,
    isLoading: authState.isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


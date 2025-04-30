
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/api';

interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  tier: 'free' | 'pro' | 'premium';
}

interface AppContextState {
  userProfile: UserProfile | null;
  darkMode: boolean;
  isSidebarOpen: boolean;
  isLoading: boolean;
  setDarkMode: (isDark: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load user profile when the authenticated user changes
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const profile = await userService.getCurrentUserProfile();
          if (profile) {
            setUserProfile({
              id: profile.id,
              email: profile.email || '',
              fullName: profile.fullName || null,
              // Default to 'free' tier, this should be enhanced to fetch from database
              tier: 'free',
            });
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserProfile(null);
      }
    };
    
    loadUserProfile();
  }, [user]);
  
  // Handle dark mode preference
  useEffect(() => {
    // Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check for saved preference
    const savedPreference = localStorage.getItem('darkMode');
    
    if (savedPreference !== null) {
      setDarkMode(savedPreference === 'true');
    } else {
      setDarkMode(prefersDark);
    }
  }, []);
  
  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        darkMode,
        isSidebarOpen,
        isLoading,
        setDarkMode,
        toggleSidebar,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

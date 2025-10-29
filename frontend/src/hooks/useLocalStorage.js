// useLocalStorage.js - Custom hook for localStorage management

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// Hook for managing authentication state
export const useAuth = () => {
  const [user, setUser] = useLocalStorage('cipherstudio-user', null);
  const [token, setToken] = useLocalStorage('cipherstudio-token', null);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user && !!token;

  return {
    user,
    token,
    login,
    logout,
    isAuthenticated,
  };
};

// Hook for managing theme state
export const useThemeStorage = () => {
  const [theme, setTheme] = useLocalStorage('cipherstudio-theme', 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  return {
    theme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
  };
};

// Hook for managing project state
export const useProjectStorage = () => {
  const [currentProject, setCurrentProject] = useLocalStorage('cipherstudio-current-project', null);

  const setProject = (project) => {
    setCurrentProject(project);
  };

  const clearProject = () => {
    setCurrentProject(null);
  };

  return {
    currentProject,
    setProject,
    clearProject,
  };
};

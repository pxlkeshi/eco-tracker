import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../../services/mockData';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate loading the user on initial render
  useEffect(() => {
    const loadUser = () => {
      // In a real app, this would check for a token in localStorage
      // and validate it with the backend
      
      // For our demo, we'll just use the first user
      const demoUser = users[0];
      setCurrentUser(demoUser);
      setLoading(false);
    };
    
    loadUser();
  }, []);
  
  // Function to update user data (points, level, etc.)
  const updateUserData = (updates) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      ...updates
    }));
  };
  
  // Mock login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email);
        if (user) {
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  // Mock logout function
  const logout = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setCurrentUser(null);
        resolve();
      }, 500);
    });
  };
  
  const value = {
    currentUser,
    updateUserData,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
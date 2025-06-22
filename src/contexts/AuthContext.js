import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingAuth(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const loginWithMock = (email, password) => {
    setLoading(true);
    
    setTimeout(() => {
      if ((email === "test@example.com" && password === "123456") || 
          (email === "demo" && password === "demo")) {
        
        setUser({
          uid: "mock-user-123",
          email: email,
          id: "mock-user-123",
          name: "User Demo", 
          imageUrl: "https://placehold.co/200.png",
        });
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    }, 800);
    
    return true; 
  };
  
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      loadingAuth, 
      loginWithMock,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadCurrentUser();
  }, []);

  async function login(credentials) {
    const loggedUser = await loginUser(credentials);
    setUser(loggedUser);
    return loggedUser;
  }

  async function logout() {
    const response = await logoutUser();
    setUser(null);
    return response;
  }

  async function refreshUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

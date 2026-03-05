import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('finique_admin');
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem('finique_admin');
      localStorage.removeItem('finique_admin_token');
      return null;
    }
  });

  const login = (payload) => {
    localStorage.setItem('finique_admin_token', payload.token);
    localStorage.setItem('finique_admin', JSON.stringify(payload.admin));
    setAdmin(payload.admin);
  };

  const logout = () => {
    localStorage.removeItem('finique_admin_token');
    localStorage.removeItem('finique_admin');
    setAdmin(null);
  };

  const value = useMemo(() => ({ admin, login, logout, isAuthenticated: !!admin }), [admin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

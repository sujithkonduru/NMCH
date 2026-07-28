import { createContext, useContext, useState } from 'react';
import { authAPI } from '../api/services';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('canteen_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password, remember) => {
    const res = await authAPI.login(email, password);
    const { token, user: userData } = res.data;
    localStorage.setItem('canteen_token', token);
    setUser(userData);
    if (remember) localStorage.setItem('canteen_user', JSON.stringify(userData));
    return { ok: true, user: userData };
  };

  const logout = async () => {
    try { await authAPI.logout(); } catch (_) { /* ignore */ }
    localStorage.removeItem('canteen_token');
    localStorage.removeItem('canteen_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

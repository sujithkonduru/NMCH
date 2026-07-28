import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('canteen_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password, remember) => {
    // Mock login
    const userData = {
      name: 'Admin User',
      email,
      role: email.includes('operator') ? 'Operator' : 'Admin',
      avatar: null,
    };
    setUser(userData);
    if (remember) localStorage.setItem('canteen_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('canteen_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

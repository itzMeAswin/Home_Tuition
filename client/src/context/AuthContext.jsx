import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {
          console.warn('Auth token verify failed, clearing session');
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken, ...userData } = res.data;
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData);
    const { token: newToken, ...userData } = res.data;
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = async (data) => {
    const res = await api.put('/auth/profile', data);
    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  };

  const claimBadge = async (badgeData) => {
    const res = await api.post('/auth/claim-badge', badgeData);
    if (res.data.badges) {
      setUser((prev) => ({
        ...prev,
        badges: res.data.badges,
        points: res.data.points,
      }));
    }
    return res.data;
  };

  // 1-Click Role Switcher for instant client evaluation
  const quickSwitchUser = async (targetRole) => {
    if (targetRole === 'guest') {
      logout();
      return;
    }
    const accounts = {
      student: { email: 'student@tutioncenter.com', password: 'student123' },
      parent: { email: 'parent@tutioncenter.com', password: 'parent123' },
      tutor: { email: 'sandhya@aksharasacademy.com', password: 'tutor123' },
      admin: { email: 'admin@tutioncenter.com', password: 'admin123' },
    };
    const creds = accounts[targetRole];
    if (creds) {
      return await login(creds.email, creds.password);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        role: user ? user.role : 'guest',
        login,
        register,
        logout,
        updateProfile,
        claimBadge,
        quickSwitchUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

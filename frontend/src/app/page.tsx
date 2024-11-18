'use client'
import React, { useState, useEffect } from 'react';
import LoginForm from '@/pages/LoginForm';
import Dashboard from '@/pages/Dashboard';
import { saveUserSession, checkSession, logout } from '@/utils/auth';
import type { LoginFormData, User } from '@/types/types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const user = checkSession();
    setUser(user);

    // Check session every minute
    const interval = setInterval(() => {
      const updatedUser = checkSession();
      if (!updatedUser && user) {
        setUser(null);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (data: LoginFormData) => {
    
    if (data.username && data.password) {
      saveUserSession(data.username);
      setUser({ username: data.username, lastLoginTime: Date.now() });
      setError(undefined);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <div className="">
      {user ? (
        <Dashboard  onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} error={error} />
      )}
    </div>
  );
}

export default App;
'use client'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import PrivateRoute from '@/context/PrivateRoute';
import DashboardPage from '@/pages/dashboard/page';
import LoginPage from '@/pages/login/page';
import RegisterPage from '@/pages/register/page';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
                <LoginPage />
            }
          />
          <Route
            path="/register"
            element={
                <RegisterPage />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
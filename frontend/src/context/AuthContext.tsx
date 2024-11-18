"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkSession, saveUserSession, logout as authLogout } from '../utils/auth';
import type { User, LoginFormData, RegisterFormData } from '@/types/types';

interface AuthContextType {
    user: User | null;
    error: string | undefined;
    isAuthenticated: boolean;
    login: (data: LoginFormData) => void;
    register: (data: RegisterFormData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const currentUser = checkSession();
        setUser(currentUser);

        const interval = setInterval(() => {
            const updatedUser = checkSession();
            if (!updatedUser && user) {
                setUser(null);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const login = (data: LoginFormData) => {
        if (data.email && data.password) {
            saveUserSession(data.email);
            setUser({ email: data.email, lastLoginTime: Date.now() });
            setError(undefined);
        } else {
            setError('Invalid credentials');
        }
    };

    const register = (data: RegisterFormData) => {
        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (data.username && data.email && data.password) {
            saveUserSession(data.username);
            setUser({ email: data.email, lastLoginTime: Date.now() });
            setError(undefined);
        } else {
            setError('Please fill in all fields');
        }
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, error, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
'use client'
import React, { useState } from 'react';
import { LogIn, User } from 'lucide-react';
import type { LoginFormData } from '@/types/types';
import AuthService from '@/service/authService';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
    onLogin: (data: LoginFormData) => void;
    error?: string;
    onSwitchToRegister?: () => void;
}

export default function LoginForm({ onLogin, error, onSwitchToRegister }: LoginFormProps) {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const authService = new AuthService(process.env.DATABASE_URL || 'http://localhost:3001/api');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authService.login(formData.email, formData.password);
            console.log("response",response);
            localStorage.setItem('token', response.token);
            onLogin({ email: formData.email, password: formData.password });
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Login to Insta CFPT</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    <LogIn className="w-4 h-4" />
                    Sign in
                </button>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Don't have an account? Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}
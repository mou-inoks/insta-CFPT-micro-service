import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import type { RegisterFormData } from '@/types/types';

interface RegisterFormProps {
    onRegister: (data: RegisterFormData) => void;
    onSwitchToLogin: () => void;
    error?: string;
}

export default function RegisterForm({ onRegister, onSwitchToLogin, error }: RegisterFormProps) {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(formData);
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                    <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Join Insta CFPT</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            id="username"
                            type="text"
                            required
                            className="block w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            required
                            className="block w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            className="block w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            className="block w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    Create Account
                </button>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-sm text-purple-600 hover:text-purple-500"
                    >
                        Already have an account? Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}
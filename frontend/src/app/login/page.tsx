'use client'

import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { login, error } = useAuth();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
            <LoginForm
                onLogin={login}
                onSwitchToRegister={() => router.push('/register')}
                error={error}
            />
        </div>
    );
}

'use client'
import RegisterForm from '@/components/RegisterForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const { error } = useAuth();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
            <RegisterForm
                onSwitchToLogin={() => router.push('/login')}
                error={error}
            />
        </div>
    );
}
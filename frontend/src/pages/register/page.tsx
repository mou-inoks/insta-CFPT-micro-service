import RegisterForm from '@/components/RegisterForm';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const { register, error } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
            <RegisterForm
                onRegister={register}
                onSwitchToLogin={() => navigate('/login')}
                error={error}
            />
        </div>
    );
}
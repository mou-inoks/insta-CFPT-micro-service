import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
            <LoginForm
                onLogin={login}
                onSwitchToRegister={() => navigate('/register')}
                error={error}
            />
        </div>

    );
}
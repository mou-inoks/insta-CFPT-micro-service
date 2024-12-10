'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    

    if (!isAuthenticated) {
        router.push('/login');
        return <div>Redirecting...</div>; // You can show a loading spinner here
    }

    return <>{children}</>;
};

export default PrivateRoute;

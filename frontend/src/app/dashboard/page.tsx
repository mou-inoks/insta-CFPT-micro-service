'use client'

import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/context/PrivateRoute";


export default function DashboardPage() {
    const { user, logout } = useAuth();
    console.log(user)

    // if (!user) return null;

    return (
        <PrivateRoute>
            <Dashboard onLogout={logout} />
        </PrivateRoute>
    );
}
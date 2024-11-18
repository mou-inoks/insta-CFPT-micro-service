import { User } from '@/types/types';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = 'user_session';

export const saveUserSession = (email: string) => {
    const user: User = {
        email: email,
        lastLoginTime: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const checkSession = (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEY);
    if (!userStr) return null;

    const user: User = JSON.parse(userStr);
    const timePassed = Date.now() - user.lastLoginTime;

    if (timePassed > SESSION_TIMEOUT) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }

    saveUserSession(user.email);
    return user;
};

export const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
};
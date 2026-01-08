import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../../types';

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>({
        id: 'owner-001',
        name: 'Emmanuel Effisah Otto',
        role: 'OWNER',
        email: 'owner@unimanuel.com'
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            // Auto-fix name if it's a legacy mock owner name
            if (parsedUser.role === 'OWNER' && (parsedUser.name.toLowerCase().includes('mock') || parsedUser.name === 'Musah Congo Adama')) {
                parsedUser.name = 'Emmanuel Effisah Otto';
                localStorage.setItem('user', JSON.stringify(parsedUser));
            }
            setUser(parsedUser);
        }
    }, []);

    const login = (role: UserRole) => {
        const mockUser: User = {
            id: '1',
            name: role === 'OWNER' ? 'Emmanuel Effisah Otto' : `Mock ${role.toLowerCase().replace('_', ' ')}`,
            role,
            email: `${role.toLowerCase()}@unimanuel.com`
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

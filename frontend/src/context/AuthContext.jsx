import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        // Mock authentication check
        const storedUser = localStorage.getItem('videgen_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('videgen_user', JSON.stringify(userData));
        setShowAuthModal(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('videgen_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, showAuthModal, setShowAuthModal }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

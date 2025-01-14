import React, { createContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase/client';

interface UserProfile {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    userProfile: UserProfile | null;
    fetchUserProfile: () => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    userProfile: null,
    fetchUserProfile: async () => {},
    isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error('Error fetching auth session:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const fetchUserProfile = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
                return;
            }

            setUserProfile(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const isAuthenticated = !!user;

    const contextValue: AuthContextType = {
        user,
        loading,
        userProfile,
        fetchUserProfile,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
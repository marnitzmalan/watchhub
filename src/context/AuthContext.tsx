import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase/supabaseClient';

interface UserProfile {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    // Add any other fields you have in your profiles table
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    userProfile: UserProfile | null;
    fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    userProfile: null,
    fetchUserProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        // Test Supabase connection
        // supabase.from('auth').select('*').limit(1)
        //     .then(response => {
        //         if (response.error) {
        //             console.error('Error connecting to Supabase:', response.error)
        //         } else {
        //             console.log('Successfully connected to Supabase')
        //         }
        //     })
        const session = supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
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

            if (error) throw error;

            setUserProfile(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, userProfile, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
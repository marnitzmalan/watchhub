import { createContext } from "react";
import { User } from "@supabase/supabase-js";

export interface UserProfile {
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

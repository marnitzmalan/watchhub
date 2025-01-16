import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/client";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                navigate("/");
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    return <div>Processing authentication...</div>;
};

export default AuthCallback;

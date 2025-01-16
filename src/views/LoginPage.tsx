import React, { useEffect } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const redirectTo = import.meta.env.VITE_AUTH_REDIRECT;
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

    return (
        <div className="min-h-screen min-w-full bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login / Sign Up</h1>
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: "#9333EA",
                                    brandAccent: "#7E22CE",
                                    brandButtonText: "white",
                                },
                            },
                        },
                        style: {
                            button: {
                                borderRadius: "0.375rem",
                                fontSize: "18px",
                                fontWeight: "600",
                                padding: "12px 32px",
                                transition: "background-color 0.3s",
                            },
                            input: {
                                borderRadius: "0.375rem",
                            },
                        },
                    }}
                    providers={["google"]}
                    socialLayout="horizontal"
                    redirectTo={redirectTo}
                />
            </div>
        </div>
    );
};

export default LoginPage;

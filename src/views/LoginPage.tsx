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
        <div className="min-h-screen min-w-full bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-transparent md:bg-white md:dark:bg-gray-800 md:p-8 md:rounded-lg md:shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Login / Sign Up
                </h1>
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
                                    inputBackground: "transparent",
                                    inputText: "inherit",
                                    inputPlaceholder: "darkgray",
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
                                backgroundColor: "transparent",
                                color: "inherit",
                            },
                            label: {
                                color: "inherit",
                            },
                            container: {
                                padding: "0",
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

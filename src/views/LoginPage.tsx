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
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
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
                                },
                            },
                        },
                        style: {
                            button: {
                                borderRadius: "0.375rem",
                                fontSize: "14px",
                                fontWeight: "600",
                                padding: "0.5rem 1rem",
                                transition: "background-color 0.3s",
                            },
                            input: {
                                borderRadius: "0.375rem",
                                fontSize: "14px",
                                backgroundColor: "transparent",
                            },
                            label: {
                                fontSize: "14px",
                                fontWeight: "500",
                                marginBottom: "0.25rem",
                            },
                            container: {
                                padding: "0",
                            },
                        },
                        className: {
                            input: "input-default",
                            label: "block text-sm font-medium text-gray-700 dark:text-gray-300",
                            button: "w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                            container: "space-y-4",
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

import React from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/supabase/client";
import { Auth } from "@supabase/auth-ui-react";

const LoginPage: React.FC = () => {
    const redirectTo = import.meta.env.VITE_AUTH_REDIRECT;

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
                                    brand: "#3B82F6",
                                    brandAccent: "#2563EB",
                                },
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
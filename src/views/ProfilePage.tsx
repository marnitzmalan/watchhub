import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/supabase/client";

const ProfilePage: React.FC = () => {
    const { user, userProfile, fetchUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (user && !userProfile) {
                try {
                    await fetchUserProfile();
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    setError("Failed to load profile. Please try again.");
                }
            }
        };

        loadProfile();
    }, [user, userProfile, fetchUserProfile]);

    useEffect(() => {
        if (userProfile) {
            setUsername(userProfile.username || "");
            setFullName(userProfile.full_name || "");
        }
    }, [userProfile]);

    const handleSave = async () => {
        if (!user) return;

        try {
            const { error } = await supabase.from("profiles").upsert(
                {
                    id: user.id,
                    user_id: user.id,
                    username,
                    full_name: fullName,
                },
                { onConflict: "user_id" }
            );

            if (error) throw error;

            await fetchUserProfile(); // Refresh the profile data
            setIsEditing(false);
            setError(null);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        }
    };

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {isEditing ? (
                <>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <p>Username: {userProfile.username || "Not set"}</p>
                    <p>Full Name: {userProfile.full_name || "Not set"}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default ProfilePage;

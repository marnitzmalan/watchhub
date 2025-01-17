import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";
import { IWatched } from "@/types/Watched";
import { useState, useCallback, useEffect } from "react";

export const useWatched = () => {
    const queryClient = useQueryClient();
    const [localWatched, setLocalWatched] = useState<number[]>([]);

    const fetchWatched = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return [];

        try {
            const { data, error } = await supabase
                .from("watched")
                .select("*")
                .eq("user_id", user.id);

            if (error) throw error;
            return data as IWatched[];
        } catch (error) {
            console.error("Error fetching watched:", error);
            return [];
        }
    };

    const { data: watched, isLoading } = useQuery({
        queryKey: ["watched"],
        queryFn: fetchWatched,
    });

    useEffect(() => {
        if (watched) {
            setLocalWatched(watched.map((item) => item.movie_id));
        }
    }, [watched]);

    const toggleWatchedMutation = useMutation({
        mutationFn: async (movie) => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            try {
                const existingWatched = watched?.find((fav) => fav.movie_id === movie.id);

                if (existingWatched) {
                    await supabase
                        .from("watched")
                        .delete()
                        .eq("id", existingWatched.id)
                        .eq("user_id", user.id);
                    return { type: "remove", movieId: movie.id };
                } else {
                    const { data, error } = await supabase
                        .from("watched")
                        .insert({
                            movie_id: movie.id,
                            title: movie.title,
                            poster_path: movie.poster_path,
                            user_id: user.id,
                        })
                        .select();
                    if (error) throw error;
                    return { type: "add", movie: data[0] };
                }
            } catch (error) {
                console.error("Error toggling watched:", error);
                throw error;
            }
        },
        onMutate: (movie) => {
            setLocalWatched((prev) =>
                prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
            );
        },
        onError: (err) => {
            console.error("Error in toggleWatched:", err);
            queryClient.invalidateQueries({ queryKey: ["watched"] });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["watched"] });
        },
    });

    const toggleWatched = useCallback(
        (movie) => {
            toggleWatchedMutation.mutate(movie);
        },
        [toggleWatchedMutation]
    );

    const isWatched = useCallback(
        (movieId: number) => {
            return localWatched.includes(movieId);
        },
        [localWatched]
    );

    return { watched, isLoading, toggleWatched, isWatched };
};

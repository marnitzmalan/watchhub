import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";
import { IMovie } from "@/types/Movie";
import { IWatchlist } from "@/types/Watchlist";
import { useState, useCallback, useEffect } from "react";

export const useWatchlist = () => {
    const queryClient = useQueryClient();
    const [localWatchlist, setLocalWatchlist] = useState<number[]>([]);

    const fetchWatchlist = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase.from("watchlist").select("*").eq("user_id", user.id);

        if (error) {
            throw error;
        }
        return data as IWatchlist[];
    };

    const { data: watchlist, isLoading } = useQuery({
        queryKey: ["watchlist"],
        queryFn: fetchWatchlist,
    });

    useEffect(() => {
        if (watchlist) {
            setLocalWatchlist(watchlist.map((item) => item.movie_id));
        }
    }, [watchlist]);

    const toggleWatchlistMutation = useMutation({
        mutationFn: async (movie: IMovie) => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            const existingWatchlist = watchlist?.find((fav) => fav.movie_id === movie.id);

            if (existingWatchlist) {
                await supabase
                    .from("watchlist")
                    .delete()
                    .eq("id", existingWatchlist.id)
                    .eq("user_id", user.id);
                return { type: "remove", movieId: movie.id };
            } else {
                const { data, error } = await supabase
                    .from("watchlist")
                    .insert({
                        movie_id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        user_id: user.id,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                    })
                    .select();
                if (error) throw error;
                return { type: "add", movie: data[0] };
            }
        },
        onMutate: (movie) => {
            setLocalWatchlist((prev) =>
                prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
            );
        },
        onError: (err) => {
            console.error("Error in toggleWatchlist:", err);
            queryClient.invalidateQueries({ queryKey: ["watchlist"] });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["watchlist"] });
        },
    });

    const toggleWatchlist = useCallback(
        (movie: IMovie) => {
            toggleWatchlistMutation.mutate(movie);
        },
        [toggleWatchlistMutation]
    );

    const isWatchlist = useCallback(
        (movieId: number) => {
            return localWatchlist.includes(movieId);
        },
        [localWatchlist]
    );

    return { watchlist, isLoading, toggleWatchlist, isWatchlist };
};

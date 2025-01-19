import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";
import { IMovie } from "@/types/Movie";
import { useState, useCallback, useEffect } from "react";

interface IFavourite {
    id: number;
    movie_id: number;
    user_id: string;
    title: string;
    poster_path: string;
}

interface ToggleFavouriteResult {
    type: "add" | "remove";
    movieId: number;
    movie?: IFavourite;
}

export const useFavourite = () => {
    const queryClient = useQueryClient();
    const [localFavourite, setLocalFavourite] = useState<number[]>([]);

    const fetchFavourite = async (): Promise<IFavourite[]> => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return [];

        try {
            const { data, error } = await supabase
                .from("favourite")
                .select("*")
                .eq("user_id", user.id);

            if (error) throw error;
            return data as IFavourite[];
        } catch (error) {
            console.error("Error fetching favourite:", error);
            return [];
        }
    };

    const { data: favourite, isLoading } = useQuery<IFavourite[]>({
        queryKey: ["favourite"],
        queryFn: fetchFavourite,
    });

    useEffect(() => {
        if (favourite) {
            setLocalFavourite(favourite.map((item) => item.movie_id));
        }
    }, [favourite]);

    const toggleFavouriteMutation = useMutation<ToggleFavouriteResult, Error, IMovie>({
        mutationFn: async (movie) => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            try {
                const existingFavourite = favourite?.find((fav) => fav.movie_id === movie.id);

                if (existingFavourite) {
                    await supabase
                        .from("favourite")
                        .delete()
                        .eq("id", existingFavourite.id)
                        .eq("user_id", user.id);
                    return { type: "remove", movieId: movie.id };
                } else {
                    const { data, error } = await supabase
                        .from("favourite")
                        .insert({
                            movie_id: movie.id,
                            title: movie.title,
                            poster_path: movie.poster_path,
                            user_id: user.id,
                        })
                        .select();
                    if (error) throw error;
                    return { type: "add", movieId: movie.id, movie: data[0] as IFavourite };
                }
            } catch (error) {
                console.error("Error toggling favourite:", error);
                throw error;
            }
        },
        onMutate: (movie) => {
            setLocalFavourite((prev) =>
                prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
            );
        },
        onError: (err) => {
            console.error("Error in toggleFavourite:", err);
            queryClient.invalidateQueries({ queryKey: ["favourite"] });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favourite"] });
        },
    });

    const toggleFavourite = useCallback(
        (movie: IMovie) => {
            toggleFavouriteMutation.mutate(movie);
        },
        [toggleFavouriteMutation]
    );

    const isFavourite = useCallback(
        (movieId: number) => {
            return localFavourite.includes(movieId);
        },
        [localFavourite]
    );

    return { favourite, isLoading, toggleFavourite, isFavourite };
};

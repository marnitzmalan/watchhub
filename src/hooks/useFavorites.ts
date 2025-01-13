import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '@/supabase/client';
import { IMovie } from '@/types/Movie';
import { IFavorite } from '@/types/Favorite';

export const useFavorites = () => {
    const queryClient = useQueryClient();

    const fetchFavorites = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            throw error;
        }
        return data as IFavorite[];
    };

    const { data: favorites, isLoading } = useQuery('favorites', fetchFavorites);

    const toggleFavoriteMutation = useMutation(
        async (movie: IMovie) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const existingFavorite = favorites?.find(fav => fav.movie_id === movie.id);

            if (existingFavorite) {
                await supabase
                    .from('favorites')
                    .delete()
                    .eq('id', existingFavorite.id)
                    .eq('user_id', user.id);
            } else {
                await supabase
                    .from('favorites')
                    .insert({
                        movie_id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        user_id: user.id,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                    });
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('favorites');
            },
        }
    );

    const toggleFavorite = (movie: IMovie) => {
        toggleFavoriteMutation.mutate(movie);
    };

    const isFavorite = (movieId: number) => {
        return favorites?.some(fav => fav.movie_id === movieId) ?? false;
    };

    return { favorites, isLoading, toggleFavorite, isFavorite };
};
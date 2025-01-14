import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '@/supabase/client';
import { IMovie } from '@/types/Movie';
import { IWatchlist } from '@/types/Watchlist';

export const useWatchlist = () => {
    const queryClient = useQueryClient();

    const fetchWatchlist = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('watchlist')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            throw error;
        }
        return data as IWatchlist[];
    };

    const { data: watchlist, isLoading } = useQuery('watchlist', fetchWatchlist);

    const toggleWatchlistMutation = useMutation(
        async (movie: IMovie) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const existingWatchlist = watchlist?.find(fav => fav.movie_id === movie.id);

            if (existingWatchlist) {
                await supabase
                    .from('watchlist')
                    .delete()
                    .eq('id', existingWatchlist.id)
                    .eq('user_id', user.id);
            } else {
                await supabase
                    .from('watchlist')
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
                queryClient.invalidateQueries('watchlist');
            },
        }
    );

    const toggleWatchlist = (movie: IMovie) => {
        toggleWatchlistMutation.mutate(movie);
    };

    const isWatchlist = (movieId: number) => {
        return watchlist?.some(fav => fav.movie_id === movieId) ?? false;
    };

    return { watchlist, isLoading, toggleWatchlist, isWatchlist };
};
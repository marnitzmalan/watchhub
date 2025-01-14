import React from 'react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { IMovie } from '@/types/Movie';
import MovieCard from '@/components/MovieCard';
import { usePopularMovies } from '@/api/movies';
import { useAuth } from '@/context/AuthContext';
import SkeletonLoader from '@/components/SkeletonLoader';

const MoviesPage: React.FC = () => {
    const { data: response, isLoading, error } = usePopularMovies();
    const { watchlist, toggleWatchlist, isWatchlist } = useWatchlist();
    const { isAuthenticated } = useAuth();

    const handleToggleWatchlist = (movie: IMovie) => {
        toggleWatchlist(movie);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mt-8 mb-4">Popular Movies</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(18)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 mt-8">Error: {error.message || 'An error occurred'}</div>;
    }

    const movies = (response as { results: IMovie[] })?.results || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex-1 px-4">
                <h1 className="text-2xl font-bold mt-8 mb-4">Popular Movies</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {movies.map((movie: IMovie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            IsWatchlist={isWatchlist(movie.id)}
                            onToggleWatchlist={() => handleToggleWatchlist(movie)}
                            isAuthenticated={isAuthenticated}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
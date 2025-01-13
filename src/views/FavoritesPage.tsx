import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import MovieCard from '@/components/MovieCard';
import { IMovie } from '@/types/Movie';
import SkeletonLoader from '@/components/SkeletonLoader';

const FavoritesPage: React.FC = () => {
    const { user } = useAuth();
    const { favorites, isLoading, toggleFavorite, isFavorite } = useFavorites();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-6">Favorite Movies</h1>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">You need to be logged in to see your favorites.</p>
                    <p>Please <Link to="/login" className="text-blue-500 hover:text-blue-700 underline">log in</Link> to view and manage your favorite movies.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Favorite Movies</h1>
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {[...Array(16)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            ) : favorites && favorites.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {favorites.map(favorite => {
                        const movie: IMovie = {
                            id: favorite.movie_id,
                            title: favorite.title,
                            poster_path: favorite.poster_path,
                            release_date: favorite.release_date || '',
                            popularity: favorite.popularity || 0,
                            overview: favorite.overview || '',
                            vote_average: favorite.vote_average !== undefined ? favorite.vote_average : 0,
                            genres: favorite.genres || []
                        };
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isFavorite={isFavorite(movie.id)}
                                onToggleFavorite={() => toggleFavorite(movie)}
                            />
                        );
                    })}
                </div>
            ) : (
                <p>You haven't added any favorites yet.</p>
            )}
        </div>
    );
};

export default FavoritesPage;
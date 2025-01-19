import React from "react";
import { useFavourite } from "@/hooks/useFavourite.ts";
import { IMovie } from "@/types/Movie.ts";
import MovieCard from "@/components/MovieCard.tsx";
import { usePopularMovies } from "@/hooks/usePopularMovies.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import SkeletonLoader from "@/components/SkeletonLoader.tsx";

const PopularMoviesPage: React.FC = () => {
    const { data: movies, isLoading, error } = usePopularMovies();
    const { toggleFavourite, isFavourite } = useFavourite();
    const { isAuthenticated } = useAuth();

    const handleToggleFavourite = (movie: IMovie) => {
        toggleFavourite(movie);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 relative inline-block">
                    Discover Movies
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(18)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex-1 px-4">
                <h2 className="text-2xl font-bold mb-6 relative inline-block">
                    Popular Movies
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {movies?.map((movie: IMovie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            IsFavourite={isFavourite(movie.id)}
                            onToggleFavourite={() => handleToggleFavourite(movie)}
                            isAuthenticated={isAuthenticated}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularMoviesPage;

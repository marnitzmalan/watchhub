import React from "react";
import { useRecommendedMovies } from "@/api/movies";
import { useMovieDetails } from "@/api/movies";
import MovieCard from "@/components/MovieCard";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";

interface RecommendedMoviesProps {
    movieId: number;
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ movieId }) => {
    const {
        data: recommendedMovies,
        isLoading: isLoadingRecommendations,
        error: recommendationsError,
    } = useRecommendedMovies(movieId);
    const {
        data: movieDetails,
        isLoading: isLoadingDetails,
        error: detailsError,
    } = useMovieDetails(movieId);
    const { user } = useAuth();
    const { isFavourite, toggleFavourite } = useFavourite();

    if (isLoadingRecommendations || isLoadingDetails) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="aspect-[2/3] bg-gray-200 rounded-lg animate-pulse"
                    ></div>
                ))}
            </div>
        );
    }

    if (recommendationsError || detailsError) {
        return <div>Error loading recommendations or movie details</div>;
    }

    if (!recommendedMovies || recommendedMovies.length === 0 || !movieDetails) {
        return <div>No recommendations available</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recommendedMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        IsFavourite={user ? isFavourite(movie.id) : false}
                        onToggleFavourite={() => toggleFavourite(movie)}
                        isAuthenticated={!!user}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendedMovies;

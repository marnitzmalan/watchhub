import React from "react";
import { useRecommendedMovies } from "@/hooks/useRecommendedMovies";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import MovieCard from "@/components/MovieCard";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { IMovie } from "@/types/Movie";

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
    const { toggleFavourite } = useFavourite();

    if (isLoadingRecommendations || isLoadingDetails) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {recommendedMovies.slice(0, 8).map((movie: IMovie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isAuthenticated={!!user}
                        onToggleFavourite={() => toggleFavourite(movie)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendedMovies;

import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "@/hooks/useMovieDetails"; // Updated import
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { useWatched } from "@/hooks/useWatched";
import RecommendedMovies from "@/components/RecommendedMovies";
import MovieReviews from "@/components/MovieReviews";
import TopCast from "@/views/MovieDetail/TopCast.tsx";
import MovieDetailContent from "@/views/MovieDetail/MovieDetailContent";
import AdditionalInfo from "@/views/MovieDetail/AdditionalInfo";

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = parseInt(id as string, 10);
    const { data: movieData, isLoading, error } = useMovieDetails(movieId);
    const { isAuthenticated } = useAuth();
    const { isFavourite, toggleFavourite } = useFavourite();
    const { isWatched, toggleWatched } = useWatched();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    if (!movieData) return <div>No movie data available</div>;

    const { movie, credits, videos } = movieData;

    const backdropPath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null;
    const posterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;
    const lowQualityPosterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
        : null;

    const director = credits.crew.find((person) => person.job === "Director");
    const writers = credits.crew.filter((person) => ["Screenplay", "Writer"].includes(person.job));
    const topCast = credits.cast.slice(0, 6);
    const trailer = videos.find((video) => video.type === "Trailer");

    const displayRating = movie.age_rating?.rating || "NR";
    const countryCode = movie.age_rating?.iso_3166_1 || "";
    const ratingDescription = movie.age_rating?.meaning || "";

    const handleToggleFavourite = () => {
        toggleFavourite(movie);
    };

    const handleToggleWatched = () => {
        toggleWatched(movie);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <MovieDetailContent
                movie={movie}
                backdropPath={backdropPath}
                posterSrc={posterSrc}
                lowQualityPosterSrc={lowQualityPosterSrc}
                displayRating={displayRating}
                countryCode={countryCode}
                ratingDescription={ratingDescription}
                director={director}
                writers={writers}
                isAuthenticated={isAuthenticated}
                isFavourite={isFavourite(movie.id)}
                isWatched={isWatched(movie.id)}
                handleToggleFavourite={handleToggleFavourite}
                handleToggleWatched={handleToggleWatched}
                trailerKey={trailer?.key}
                handleToggleWatchlist={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />

            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="md:w-2/3 md:pr-8">
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">More Like This</h2>
                            <RecommendedMovies movieId={movie.id} />
                        </div>

                        <div className="mt-8">
                            <TopCast cast={topCast} movieId={0} />
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
                            <MovieReviews movieId={movie.id} />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="md:w-1/3 mt-8">
                        <AdditionalInfo movie={movie} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;

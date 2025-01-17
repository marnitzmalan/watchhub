import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useFavourite } from "@/hooks/useFavourite.ts";
import MovieCard from "@/components/MovieCard";
import { IMovie } from "@/types/Movie";
import SkeletonLoader from "@/components/SkeletonLoader";

const FavouritePage: React.FC = () => {
    const { user } = useAuth();
    const { favourite, isLoading, toggleFavourite, isFavourite } = useFavourite();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center max-w-md px-4">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                        Your Favourite Awaits!
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Sign up or log in to start building your personalized movie favourite.
                    </p>
                    <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/login"
                            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300 text-lg"
                        >
                            Login / Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 relative inline-block">
                My Favourite
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
            </h2>
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {[...Array(16)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            ) : favourite && favourite.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {favourite.map((favourite) => {
                        const movie: IMovie = {
                            id: favourite.movie_id,
                            title: favourite.title,
                            poster_path: favourite.poster_path,
                            release_date: favourite.release_date || "",
                            popularity: favourite.popularity || 0,
                            overview: favourite.overview || "",
                            vote_average:
                                favourite.vote_average !== undefined ? favourite.vote_average : 0,
                            genres: favourite.genres || [],
                        };
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                IsFavourite={isFavourite(movie.id)}
                                onToggleFavourite={() => toggleFavourite(movie)}
                                isAuthenticated={!!user}
                            />
                        );
                    })}
                </div>
            ) : (
                <p>You haven't added any favourite yet.</p>
            )}
        </div>
    );
};

export default FavouritePage;

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchlist.ts";
import MovieCard from "@/components/MovieCard";
import { IMovie } from "@/types/Movie";
import SkeletonLoader from "@/components/SkeletonLoader";

const WatchlistPage: React.FC = () => {
    const { user } = useAuth();
    const { watchlist, isLoading, toggleWatchlist, isWatchlist } = useWatchlist();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center max-w-md px-4">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Watchlist Awaits!</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Sign up or log in to start building your personalized movie watchlist.
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
                My Watchlist
                <span
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
            </h2>
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {[...Array(16)].map((_, index) => (
                        <SkeletonLoader key={index}/>
                    ))}
                </div>
            ) : watchlist && watchlist.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {watchlist.map(watchlist => {
                        const movie: IMovie = {
                            id: watchlist.movie_id,
                            title: watchlist.title,
                            poster_path: watchlist.poster_path,
                            release_date: watchlist.release_date || "",
                            popularity: watchlist.popularity || 0,
                            overview: watchlist.overview || "",
                            vote_average: watchlist.vote_average !== undefined ? watchlist.vote_average : 0,
                            genres: watchlist.genres || []
                        };
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                IsWatchlist={isWatchlist(movie.id)}
                                onToggleWatchlist={() => toggleWatchlist(movie)}
                                isAuthenticated={!!user}
                            />
                        );
                    })}
                </div>
            ) : (
                <p>You haven't added any watchlist yet.</p>
            )}
        </div>
    );
};

export default WatchlistPage;
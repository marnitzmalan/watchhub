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
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold mb-6">Watchlist Movies</h1>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">You need to be logged in to see your watchlist.</p>
                    <p>Please <Link to="/login" className="text-blue-500 hover:text-blue-700 underline">log in</Link> to view and manage your watchlist movies.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Watchlist Movies</h1>
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {[...Array(16)].map((_, index) => (
                        <SkeletonLoader key={index} />
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
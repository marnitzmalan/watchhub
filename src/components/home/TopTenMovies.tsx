import React from "react";
import { useTrendingMovies } from "@/api/movies";
import MovieCard from "@/components/MovieCard";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useAuth } from "@/hooks/useAuth";
import { IMovie } from "@/types/Movie";

const TopTenMovies: React.FC = () => {
    const { data, isLoading, error } = useTrendingMovies("week");
    const { isWatchlist, toggleWatchlist } = useWatchlist();
    const { user } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    const topTenMovies = data.results.slice(0, 10);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topTenMovies.map((movie: IMovie) => (
                <div key={movie.id} className="relative">
                    <MovieCard
                        movie={movie}
                        IsWatchlist={isWatchlist(movie.id)}
                        onToggleWatchlist={() => toggleWatchlist(movie)}
                        isAuthenticated={!!user}
                    />
                </div>
            ))}
        </div>
    );
};

export default TopTenMovies;

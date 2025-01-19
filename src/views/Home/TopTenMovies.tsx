import React from "react";
import { useTrendingMovies } from "@/hooks/useTrendingMovies.ts";
import MovieCard from "@/components/MovieCard.tsx";
import { useFavourite } from "@/hooks/useFavourite.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import { IMovie } from "@/types/Movie.ts";

const TopTenMovies: React.FC = () => {
    const { data, isLoading, error } = useTrendingMovies("week");
    const { isFavourite, toggleFavourite } = useFavourite();
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
                        IsFavourite={isFavourite(movie.id)}
                        onToggleFavourite={() => toggleFavourite(movie)}
                        isAuthenticated={!!user}
                    />
                </div>
            ))}
        </div>
    );
};

export default TopTenMovies;

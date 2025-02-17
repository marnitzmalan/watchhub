import React from "react";
import { useKnownFor } from "@/hooks/useKnownFor";
import MovieCard from "@/components/MovieCard";
import { IMovie } from "@/types/Movie";

interface KnownForMoviesProps {
    personId: number;
}

const KnownForMovies: React.FC<KnownForMoviesProps> = ({ personId }) => {
    const { data: knownForMovies, isLoading, error } = useKnownFor(personId);

    if (isLoading) return <div>Loading known movies...</div>;
    if (error) return <div>Error loading movies: {(error as Error).message}</div>;
    if (!knownForMovies || knownForMovies.length === 0) return <div>No known movies available</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mt-8 mb-4">Known For</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {knownForMovies.map((movie: IMovie) => (
                    <MovieCard key={movie.id} movie={movie} isAuthenticated={false} />
                ))}
            </div>
        </div>
    );
};

export default KnownForMovies;

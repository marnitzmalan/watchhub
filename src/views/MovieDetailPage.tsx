import { useParams, Link } from 'react-router-dom';
import { useMovieDetails } from '@/api/movies';
import { IGenre } from '@/types/Genre';
import { IMovie } from '@/types/Movie';

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, isLoading, error } = useMovieDetails(Number(id)) as { data: IMovie | null, isLoading: boolean, error: Error | null };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Link to="/movies" className="text-blue-500 hover:underline mb-4 block">&larr; Back to Movies</Link>
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-lg"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-600 mb-4">Release
                        Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                    <p className="mb-4">{movie.overview}</p>
                    <p className="mb-2"><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
                    <div className="mb-4">
                        <strong>Genres:</strong>
                        <ul className="list-disc list-inside">
                            {movie.genres.map((genre: IGenre) => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
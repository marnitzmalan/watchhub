import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/movies';

interface MovieDetail {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    vote_average: number;
    genres: { id: number; name: string }[];
}

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await getMovieDetails(Number(id));
                setMovie(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch movie details');
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
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
                    <p className="text-gray-600 mb-4">Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                    <p className="mb-4">{movie.overview}</p>
                    <p className="mb-2"><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
                    <div className="mb-4">
                        <strong>Genres:</strong>
                        <ul className="list-disc list-inside">
                            {movie.genres.map(genre => (
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
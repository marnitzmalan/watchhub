import { useState, useEffect } from 'react';
import { getPopularMovies } from '../api/movies';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getPopularMovies();
                setMovies(response.data.results);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch movies');
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mt-8 mb-4">Popular Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-bold text-lg mb-2">{movie.title}</h2>
                            <p className="text-sm text-gray-600">
                                Release Date: {new Date(movie.release_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;
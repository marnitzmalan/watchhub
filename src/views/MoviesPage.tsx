import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularMovies } from '../api/movies';
import AdvanceSearch from '../components/AdvanceSearch';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

interface SearchCriteria {
    genre?: string;
    year?: number;
    rating?: number;
}

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMovies().then(() => {
            // You can add any post-fetch logic here if needed
        });
    }, []);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            // In a real application, you would pass the criteria to your API call
            const response = await getPopularMovies();
            setMovies(response.data.results);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch movies');
            setLoading(false);
        }
    };

    const handleAdvanceSearch = () => {
        fetchMovies();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex">
            <div className="w-64">
                <AdvanceSearch onSearch={handleAdvanceSearch}/>
            </div>
            <div className="flex-1 px-4">
                <h1 className="text-2xl font-bold mt-8 mb-4">Popular Movies</h1>
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-center">
                    {movies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}
                              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-[2/3] relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-2">
                                <h2 className="font-bold text-sm mb-1 truncate">{movie.title}</h2>
                                <p className="text-xs text-gray-600">
                                    {new Date(movie.release_date).getFullYear()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { usePopularMovies } from '@/api/movies';
import AdvanceSearch from '@/components/AdvanceSearch';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

const MoviesPage: React.FC = () => {
    const { data: response, isLoading, error, refetch } = usePopularMovies();

    const movies = response?.results || [];

    const handleAdvanceSearch = () => {
        // Implement advanced search logic here
        console.log('Advanced search triggered');
        // For now, just refetch the popular movies
        refetch();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 mt-8">Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
    }

    return (
        <div className="flex">
            <div className="w-full md:w-64 hidden md:block">
                <AdvanceSearch onSearch={handleAdvanceSearch}/>
            </div>
            <div className="flex-1 px-4">
                <h1 className="text-2xl font-bold mt-8 mb-4">Popular Movies</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-center">
                    {movies.map((movie: Movie) => (
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
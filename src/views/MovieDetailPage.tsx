import { useParams, Link } from 'react-router-dom';
import { useMovieDetails } from '@/api/movies';
import { IGenre } from '@/types/Genre';
import { IMovie } from '@/types/Movie';
import { useImageCache } from '@/hooks/useImageCache';

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, isLoading, error } = useMovieDetails(Number(id)) as { data: IMovie | null, isLoading: boolean, error: Error | null };
    const posterSrc = movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
    const cachedImageSrc = useImageCache(posterSrc);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;
    if (!movie) return <div>Movie not found</div>;

    // Placeholder cast data
    const topCast = [
        { name: "Keanu Reeves", character: "Neo", image: "https://via.placeholder.com/150" },
        { name: "Laurence Fishburne", character: "Morpheus", image: "https://via.placeholder.com/150" },
        { name: "Carrie-Anne Moss", character: "Trinity", image: "https://via.placeholder.com/150" },
        { name: "Hugo Weaving", character: "Agent Smith", image: "https://via.placeholder.com/150" },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Link to="/movies" className="text-blue-500 hover:underline mb-4 block">&larr; Back to Movies</Link>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    {cachedImageSrc ? (
                        <img
                            src={cachedImageSrc}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    ) : (
                        <div className="w-full h-[450px] bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
                    )}
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-600 mb-4">
                        {new Date(movie.release_date).getFullYear()} • 2h 16m {/* Placeholder duration */}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                        {movie.genres.map((genre: IGenre) => (
                            <span key={genre.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="mb-4">
                        <span className="bg-yellow-400 text-black font-bold rounded px-2 py-1 mr-2">
                            IMDb {movie.vote_average.toFixed(1)}
                        </span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Top Cast</h2>
                        <ul className="grid grid-cols-2 gap-2">
                            <li>Actor Name as Character</li>
                            <li>Actor Name as Character</li>
                            <li>Actor Name as Character</li>
                            <li>Actor Name as Character</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold">Director</h3>
                        <p>Director Name</p>

                        <h3 className="font-bold mt-2">Writers</h3>
                        <p>Writer Name, Writer Name</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* Placeholder for trailer */}
                    <div className="flex items-center justify-center h-full">
                        Trailer Placeholder
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {topCast.map((actor, index) => (
                        <div key={index} className="text-center">
                            {/*<img src={actor.image} alt={actor.name}*/}
                            {/*     className="w-24 h-24 mx-auto rounded-full object-cover mb-2"/>*/}
                            <p className="font-semibold">{actor.name}</p>
                            <p className="text-sm text-gray-600">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">More Like This</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Placeholder for similar movies */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
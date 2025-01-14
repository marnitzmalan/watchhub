import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchMovies } from "@/api/movies";
import { useDebounce } from "@/hooks/useDebounce";
import { IMovie } from "@/types/Movie";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<IMovie[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data } = useSearchMovies(debouncedSearchQuery, 1);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (data && typeof data === "object" && "results" in data) {
            const sortedResults = (data.results as IMovie[])
                .sort((a: IMovie, b: IMovie) => b.popularity - a.popularity)
                .slice(0, 5);
            setSuggestions(sortedResults);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [data]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
        setSearchQuery("");
        setShowSuggestions(false);
    };

    const getYearFromDate = (dateString: string) => {
        return dateString ? new Date(dateString).getFullYear() : "";
    };

    return (
        <div className="w-full max-w-lg relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </form>
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg">
                    <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {suggestions.map((movie) => (
                            <li
                                key={movie.id}
                                className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 flex items-center"
                                onClick={() => handleSuggestionClick(movie.id)}
                            >
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-12 h-18 object-cover rounded mr-3"
                                    />
                                )}
                                <div className="flex-grow">
                                    <div className="font-medium">{movie.title}</div>
                                    <div className="text-sm text-gray-500">
                                        {getYearFromDate(movie.release_date)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
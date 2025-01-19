import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchMovies } from "@/hooks/useSearchMovies.ts";
import { useDebounce } from "@/hooks/useDebounce.ts";
import { IMovie } from "@/types/Movie.ts";
import { MdSearch } from "react-icons/md";

interface SearchBarProps {
    onMovieSelect?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onMovieSelect }) => {
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
            onMovieSelect?.();
        }
    };

    const handleSuggestionClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
        setSearchQuery("");
        setShowSuggestions(false);
        onMovieSelect?.();
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
                    className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:text-white sm:text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MdSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                />
            </form>
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 overflow-auto focus:outline-none sm:text-sm">
                        {suggestions.map((movie) => (
                            <li
                                key={movie.id}
                                className="text-gray-900 dark:text-gray-100 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
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

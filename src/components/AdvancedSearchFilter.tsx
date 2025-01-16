import React from "react";
import { ISearchCriteria } from "@/types/SearchCriteria";
import { GENRES } from "@/constants/genres";
import { CERTIFICATES } from "@/constants/certificates";
import { MdClear, MdSearch } from "react-icons/md";
import SelectDropdown from "@/components/ui/SelectDropdown";

type AdvancedSearchFilterProps = {
    searchCriteria: ISearchCriteria;
    setSearchCriteria: React.Dispatch<React.SetStateAction<ISearchCriteria>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleClearSearch: () => void;
    isAnyFilterSet: () => boolean;
};

const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
    searchCriteria,
    setSearchCriteria,
    handleSubmit,
    handleClearSearch,
    isAnyFilterSet,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchCriteria((prev) => ({
            ...prev,
            [name]:
                value === ""
                    ? undefined
                    : name === "year" || name === "rating"
                      ? Number(value)
                      : value,
        }));
    };

    const handleGenreToggle = (genreId: number) => {
        setSearchCriteria((prev) => {
            const newGenres = prev.genres.includes(genreId)
                ? prev.genres.filter((id) => id !== genreId)
                : [...prev.genres, genreId];
            return { ...prev, genres: newGenres };
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded-lg p-6">
            {/* Search and Clear buttons at the top */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    type="submit"
                    className={`flex-grow text-white py-2 px-4 rounded flex items-center justify-center ${
                        isAnyFilterSet()
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-purple-400 cursor-not-allowed"
                    }`}
                    disabled={!isAnyFilterSet()}
                >
                    <MdSearch size={20} className="mr-2" />
                    Search
                </button>
                <button
                    type="button"
                    onClick={handleClearSearch}
                    className={`flex-grow text-white py-2 px-4 rounded flex items-center justify-center ${
                        isAnyFilterSet()
                            ? "bg-gray-400 hover:bg-gray-500"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!isAnyFilterSet()}
                    aria-label="Clear search"
                >
                    <MdClear size={20} className="mr-2" />
                    Clear
                </button>
            </div>

            {/* Filter fields */}
            <div className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="query"
                        name="query"
                        value={searchCriteria.query}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter movie title"
                    />
                </div>

                {/* Genres */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
                    <div className="flex flex-wrap gap-2">
                        {GENRES.map((genre) => (
                            <button
                                key={genre.id}
                                type="button"
                                onClick={() => handleGenreToggle(genre.id)}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    searchCriteria.genres.includes(genre.id)
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                                }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Release Year */}
                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                        Release Year
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={searchCriteria.year || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter release year"
                    />
                </div>

                {/* Keyword */}
                <div className="mb-4">
                    <label
                        htmlFor="keyword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Keyword
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        value={searchCriteria.keyword}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter keyword"
                    />
                </div>

                {/* Country */}
                <div className="mb-4">
                    <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={searchCriteria.country}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter country"
                    />
                </div>

                {/* Runtime */}
                <div className="mb-4">
                    <label
                        htmlFor="runtime"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Runtime (minutes)
                    </label>
                    <input
                        type="number"
                        id="runtime"
                        name="runtime"
                        value={searchCriteria.runtime || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter runtime in minutes"
                    />
                </div>

                {/* IMDb Rating */}
                <div className="mb-4">
                    <label
                        htmlFor="imdbRating"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        IMDb Rating
                    </label>
                    <input
                        type="number"
                        id="imdbRating"
                        name="imdbRating"
                        value={searchCriteria.imdbRating || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter IMDb rating"
                        step="0.1"
                        min="0"
                        max="10"
                    />
                </div>

                {/* Cast */}
                <div className="mb-4">
                    <label htmlFor="cast" className="block text-sm font-medium text-gray-700 mb-2">
                        Cast
                    </label>
                    <input
                        type="text"
                        id="cast"
                        name="cast"
                        value={searchCriteria.cast}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter cast member name"
                    />
                </div>

                {/* Language */}
                <div className="mb-4">
                    <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Language
                    </label>
                    <input
                        type="text"
                        id="language"
                        name="language"
                        value={searchCriteria.language}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Enter language"
                    />
                </div>

                {/* Certificate */}
                <div>
                    <SelectDropdown
                        label="US Certificate (Age Rating)"
                        options={CERTIFICATES}
                        value={searchCriteria.certificate ?? ""}
                        onChange={(value) =>
                            setSearchCriteria((prev) => ({ ...prev, certificate: value }))
                        }
                        placeholder="Select rating"
                    />
                </div>
            </div>
        </form>
    );
};

export default AdvancedSearchFilter;

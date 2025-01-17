import React from "react";
import { ISearchCriteria } from "@/types/SearchCriteria";
import { GENRES } from "@/constants/genres";
import { CERTIFICATES } from "@/constants/certificates";
import { MdClear, MdSearch } from "react-icons/md";
import AppButton from "@/components/ui/AppButton";
import AppDropdown from "@/components/ui/AppDropdown.tsx";

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
        <form
            onSubmit={handleSubmit}
            className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-6"
        >
            {/* Search and Clear buttons at the top */}
            <div className="mb-6">
                <AppButton
                    type="submit"
                    icon={<MdSearch size={20} />}
                    disabled={!isAnyFilterSet()}
                    variant="gradient"
                    className="w-full"
                    title={!isAnyFilterSet() ? "Please set at least one filter to search" : ""}
                >
                    Search
                </AppButton>
                {isAnyFilterSet() && (
                    <AppButton
                        type="button"
                        icon={<MdClear size={20} />}
                        onClick={handleClearSearch}
                        variant="secondary"
                        className="w-full mt-2"
                    >
                        Clear Filters
                    </AppButton>
                )}
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
                        className="input-default"
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
                        className="input-default"
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
                        className="input-default"
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
                        className="input-default"
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
                        className="input-default"
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
                        className="input-default"
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
                        className="input-default"
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
                        className="input-default"
                        placeholder="Enter language"
                    />
                </div>

                {/* Certificate */}
                <div>
                    <AppDropdown
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

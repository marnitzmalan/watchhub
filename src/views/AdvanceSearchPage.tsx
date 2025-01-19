import React, { useState } from "react";
import { useAdvancedSearchMovies } from "@/hooks/useAdvancedSearchMovies.ts";
import { useAuth } from "@/hooks/useAuth";
import { useFavourite } from "@/hooks/useFavourite";
import { useWatched } from "@/hooks/useWatched";
import { ISearchCriteria } from "@/types/SearchCriteria";
import AdvanceSearchResults from "@/components/AdvanceSearchResults.tsx";
import AppButton from "@/components/ui/AppButton";
import AppHeader from "@/components/ui/AppHeader.tsx";
import AdvancedSearchFilter from "@/components/AdvancedSearchFilter";
import { MdFilterList, MdFilterListOff } from "react-icons/md";

const AdvanceSearchPage: React.FC = () => {
    const [searchCriteria, setSearchCriteria] = useState<ISearchCriteria>({
        query: "",
        genres: [],
        year: undefined,
        rating: undefined,
        keyword: "",
        country: "",
        runtime: undefined,
        imdbRating: undefined,
        cast: "",
        language: "",
        certificate: "",
    });
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const {
        data: movies,
        isLoading,
        error,
    } = useAdvancedSearchMovies(searchCriteria, isSearchClicked);
    const { isAuthenticated } = useAuth();
    const { toggleFavourite, isFavourite } = useFavourite();
    const { toggleWatched, isWatched } = useWatched();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSearchClicked(true);
        setIsFilterVisible(false);
    };

    const handleClearSearch = () => {
        setSearchCriteria({
            query: "",
            genres: [],
            year: undefined,
            rating: undefined,
            keyword: "",
            country: "",
            runtime: undefined,
            imdbRating: undefined,
            cast: "",
            language: "",
            certificate: "",
        });
        setIsSearchClicked(false);
    };

    const isAnyFilterSet = () => {
        return Object.values(searchCriteria).some((value) => {
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            return value !== "" && value !== undefined;
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AppHeader title="Advanced Title Search" />
            <div className="md:hidden mb-4">
                <AppButton
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    className="w-full"
                    variant="secondary"
                >
                    {isFilterVisible ? (
                        <>
                            <MdFilterListOff className="h-5 w-5 mr-2" />
                            Hide Filters
                        </>
                    ) : (
                        <>
                            <MdFilterList className="h-5 w-5 mr-2" />
                            Show Filters
                        </>
                    )}
                </AppButton>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left column: Search form */}
                <div className={`w-full md:w-1/3 ${isFilterVisible ? "" : "hidden md:block"}`}>
                    <AdvancedSearchFilter
                        searchCriteria={searchCriteria}
                        setSearchCriteria={setSearchCriteria}
                        handleSubmit={handleSubmit}
                        handleClearSearch={handleClearSearch}
                        isAnyFilterSet={isAnyFilterSet}
                    />
                </div>
                {/* Right column: Search results */}
                <div className="w-full md:w-2/3">
                    {isLoading && isSearchClicked && <p className="text-center">Loading...</p>}
                    {error && (
                        <p className="text-center text-red-600">
                            Error: {(error as Error).message}
                        </p>
                    )}
                    {movies && isSearchClicked && (
                        <AdvanceSearchResults
                            movies={movies}
                            isAuthenticated={isAuthenticated}
                            isFavourite={isFavourite}
                            onToggleFavourite={toggleFavourite}
                            isWatched={isWatched}
                            onToggleWatched={toggleWatched}
                        />
                    )}
                    {!isFilterVisible && !isSearchClicked && (
                        <div className="flex flex-col mt-12 md:mt-40 items-center h-full text-gray-500">
                            <img
                                src="/search_empty.png"
                                alt="Empty search"
                                className="w-56 md:w-80 mb-6"
                            />
                            <h3 className="text-2xl text-center font-semibold mb-2">
                                Ready for a Streaming Adventure?
                            </h3>
                            <p className="text-center max-w-md">
                                Use our filters to uncover your next binge-worthy obsession. From
                                blockbuster movies to addictive TV series, your perfect watch is
                                just a search away!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvanceSearchPage;

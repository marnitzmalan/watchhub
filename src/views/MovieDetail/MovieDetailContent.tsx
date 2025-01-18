import React, { useState } from "react";
import {
    MdArrowBack,
    MdOutlineBookmark,
    MdRemoveRedEye,
    MdOutlineStar,
    MdPlayArrow,
} from "react-icons/md";
import ProgressiveImage from "@/components/ProgressiveImage";
import { IGenre, IMovie } from "@/types/Movie";
import AppButton from "@/components/ui/AppButton.tsx";
import TrailerModal from "@/components/TrailerModal";

interface MovieDetailContentProps {
    movie: IMovie;
    backdropPath: string | null;
    posterSrc: string | null;
    lowQualityPosterSrc: string | null;
    displayRating: string;
    countryCode: string;
    ratingDescription: string;
    director: { name: string } | undefined;
    writers: { name: string }[];
    isAuthenticated: boolean;
    handleToggleFavourite: () => void;
    handleToggleWatched: () => void;
    handleToggleWatchlist: () => void;
}

const MovieDetailContent: React.FC<MovieDetailContentProps> = ({
    movie,
    backdropPath,
    posterSrc,
    lowQualityPosterSrc,
    displayRating,
    director,
    writers,
    isAuthenticated,
    handleToggleFavourite,
    handleToggleWatched,
    handleToggleWatchlist,
    trailerKey,
}) => {
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

    const openTrailerModal = () => setIsTrailerModalOpen(true);
    const closeTrailerModal = () => setIsTrailerModalOpen(false);

    return (
        <div className="relative">
            <div
                className="w-full h-[350px] sm:h-[450px] md:h-[625px] bg-cover bg-top relative"
                style={{ backgroundImage: `url(${backdropPath})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 -mt-[350px] sm:-mt-[450px] md:-mt-[625px] pt-6 sm:pt-10 md:pt-12 pb-12">
                <div className="flex flex-col items-center md:flex-row gap-6 md:gap-8">
                    <div className="w-[200px] sm:w-[250px] md:w-[350px] mx-auto md:mx-0">
                        <div className="aspect-[2/3] w-full">
                            {posterSrc ? (
                                <ProgressiveImage
                                    lowQualitySrc={lowQualityPosterSrc}
                                    highQualitySrc={posterSrc}
                                    alt={movie.title}
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 text-gray-900 md:text-white pt-5 sm:pt-10 md:pt-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                            {movie.title}
                        </h1>

                        <div className="mb-6 flex flex-wrap items-center text-sm sm:text-base text-gray-600 md:text-gray-300">
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                            <span className="mx-2">•</span>
                            {movie.genres.map((genre: IGenre, index: number) => (
                                <React.Fragment key={genre.id}>
                                    {index > 0 && <span className="mx-1">,</span>}
                                    <span>{genre.name}</span>
                                </React.Fragment>
                            ))}
                            <span className="mx-2">•</span>
                            <span>{movie.runtime} min</span>
                        </div>

                        {isAuthenticated && (
                            <div className="mb-6 flex flex-wrap gap-2">
                                <AppButton
                                    onClick={handleToggleFavourite}
                                    icon={<MdOutlineBookmark size={20} />}
                                    title="Add to Favorites"
                                    className="flex-grow sm:flex-grow-0 py-2 px-4 md:bg-transparent md:text-white
                                    bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                                >
                                    <span className="hidden sm:inline">Favorite</span>
                                </AppButton>
                                <AppButton
                                    onClick={handleToggleWatchlist}
                                    icon={<MdOutlineStar size={20} />}
                                    title="Add to Watchlist"
                                    className="flex-grow sm:flex-grow-0 py-2 px-4 md:bg-transparent md:text-white
                                    bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                                >
                                    <span className="hidden sm:inline">Watchlist</span>
                                </AppButton>
                                <AppButton
                                    onClick={handleToggleWatched}
                                    icon={<MdRemoveRedEye size={20} />}
                                    title="Mark as Watched"
                                    className="flex-grow sm:flex-grow-0 py-2 px-4 md:bg-transparent md:text-white
                                    bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                                >
                                    <span className="hidden sm:inline">Watched</span>
                                </AppButton>
                            </div>
                        )}

                        <div className="mb-6">
                            {movie.tagline && (
                                <p className="text-lg italic text-gray-400 mb-4">
                                    "{movie.tagline}"
                                </p>
                            )}
                            <h2 className="text-xl font-bold mb-2">Overview</h2>
                            <p className="text-base text-gray-600 md:text-gray-300">
                                {movie.overview}
                            </p>
                        </div>

                        <div className="mb-6 text-base">
                            <div className="mb-2">
                                <span className="font-bold">Director: </span>
                                <span className="text-gray-600 md:text-gray-300">
                                    {director ? director.name : "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="font-bold">Writers: </span>
                                <span className="text-gray-600 md:text-gray-300">
                                    {writers && writers.length > 0
                                        ? writers.map((w) => w.name).join(", ")
                                        : "N/A"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="bg-yellow-400 text-black font-bold rounded px-4 py-2 text-base">
                                IMDb {movie.vote_average.toFixed(1)}
                            </span>
                            {trailerKey && (
                                <AppButton
                                    onClick={openTrailerModal}
                                    icon={<MdPlayArrow size={20} />}
                                    title="Watch Trailer"
                                    className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-base font-bold rounded"
                                >
                                    Trailer
                                </AppButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isTrailerModalOpen && trailerKey && (
                <TrailerModal trailerKey={trailerKey} onClose={closeTrailerModal} />
            )}
        </div>
    );
};

export default MovieDetailContent;
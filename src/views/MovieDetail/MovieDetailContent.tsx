import React, { useState } from "react";
import { MdOutlineBookmark, MdRemoveRedEye, MdPlayArrow } from "react-icons/md";
import LazyImage from "@/components/LazyImage";
import { IMovie } from "@/types/Movie";
import { IGenre } from "@/types/Genre";
import AppButton from "@/components/ui/AppButton";
import TrailerModal from "@/components/TrailerModal";

interface MovieDetailContentProps {
    movie: IMovie;
    backdropPath: string | null;
    lowQualityBackdropPath: string | null;
    posterSrc: string | null;
    lowQualityPosterSrc: string | null;
    director: { name: string } | undefined;
    writers: { name: string }[];
    isAuthenticated: boolean;
    isFavourite: boolean;
    handleToggleFavourite: () => void;
    isWatched: boolean;
    handleToggleWatched: () => void;
    trailerKey?: string;
}

const MovieDetailContent: React.FC<MovieDetailContentProps> = ({
    movie,
    backdropPath,
    lowQualityBackdropPath,
    posterSrc,
    lowQualityPosterSrc,
    director,
    writers,
    isAuthenticated,
    handleToggleFavourite,
    handleToggleWatched,
    isFavourite,
    isWatched,
    trailerKey,
}) => {
    const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

    const openTrailerModal = () => setIsTrailerModalOpen(true);
    const closeTrailerModal = () => setIsTrailerModalOpen(false);

    return (
        <div className="relative">
            <div className="w-full h-[225px] sm:h-[450px] md:h-[625px] bg-cover bg-top relative">
                <LazyImage
                    src={backdropPath ?? ""}
                    placeholderSrc={lowQualityBackdropPath ?? ""}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 md:bg-opacity-85"></div>
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 -mt-[225px] sm:-mt-[450px] md:-mt-[625px] pt-6 sm:pt-10 md:pt-12 pb-12">
                <div className="flex flex-col items-center md:flex-row gap-6 md:gap-8">
                    <div className="w-full sm:w-[250px] md:w-[350px] flex justify-center md:justify-start">
                        <div className="aspect-[2/3] w-28 sm:w-full">
                            <LazyImage
                                src={posterSrc ?? ""}
                                placeholderSrc={lowQualityPosterSrc ?? ""}
                                alt={movie.title}
                                className="w-28 sm:w-full object-cover rounded-lg shadow-md"
                            />
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

                        <div className="mb-4">
                            {trailerKey && (
                                <AppButton
                                    onClick={openTrailerModal}
                                    icon={<MdPlayArrow size={20} />}
                                    title="Watch Trailer"
                                    className="py-2 px-4 border text-base
                                        rounded-full font-bold
                                        transition-colors duration-200
                                        border-gray-800 text-gray-800
                                        hover:bg-gray-800 hover:text-white
                                        dark:border-white dark:text-white
                                        dark:hover:bg-white dark:hover:text-gray-800
                                        md:border-gray-100 md:text-gray-100
                                        md:hover:bg-gray-800 md:hover:text-white
                                        md:dark:border-gray-800 md:dark:text-gray-800
                                        md:dark:hover:bg-gray-800 md:dark:hover:text-white"
                                >
                                    Trailer
                                </AppButton>
                            )}
                        </div>

                        {isAuthenticated && (
                            <div className="mb-6 flex flex-col sm:flex-row gap-2">
                                <AppButton
                                    onClick={handleToggleFavourite}
                                    icon={
                                        <MdOutlineBookmark
                                            size={24}
                                            className={`${isFavourite ? "text-purple-500" : ""}`}
                                        />
                                    }
                                    title={isFavourite ? "Mark as Unfavorite" : "Mark as Favorites"}
                                    variant="ghostSecondary"
                                    className="w-full p-2 hover:bg-opacity-20 sm:w-auto ml-3"
                                >
                                    <span
                                        className={`items-center ${isFavourite ? "text-purple-500" : ""}`}
                                    ></span>
                                </AppButton>
                                <AppButton
                                    onClick={handleToggleWatched}
                                    icon={
                                        <MdRemoveRedEye
                                            size={24}
                                            className={`${isWatched ? "text-green-500" : ""}`}
                                        />
                                    }
                                    title={isWatched ? "Mark as Unwatched" : "Mark as Watched"}
                                    variant="ghostSecondary"
                                    className="w-full p-2 hover:bg-opacity-20 sm:w-auto ml-3"
                                >
                                    <span
                                        className={`items-center ${isWatched ? "text-green-500" : ""}`}
                                    ></span>
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

import React from "react";
import { usePopularMovies } from "@/api/movies";
import MovieCard from "@/components/MovieCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useAuth } from "@/hooks/useAuth";
import { useWatchlist } from "@/hooks/useWatchlist";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ArrowProps {
    onClick?: () => void;
    currentSlide?: number;
    slideCount?: number;
}

const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick, currentSlide }) => {
    return (
        <button
            onClick={onClick}
            className={`absolute left-[-30px] top-[calc(50%-20px)] -translate-y-1/2 z-10 bg-gray-800 p-3 rounded-md hover:bg-gray-700 transition duration-300 hidden md:block ${
                currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={currentSlide === 0}
        >
            <MdChevronLeft className="text-white text-3xl" />
        </button>
    );
};

const CustomNextArrow: React.FC<ArrowProps> = ({ onClick, currentSlide, slideCount }) => {
    const isLastSlide =
        typeof slideCount === "number" &&
        typeof currentSlide === "number" &&
        currentSlide + 8 >= slideCount;
    return (
        <button
            onClick={onClick}
            className={`absolute right-[-30px] top-[calc(50%-20px)] -translate-y-1/2 z-10 bg-gray-800 p-3 rounded-md hover:bg-gray-700 transition duration-300 hidden md:block ${
                isLastSlide ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={isLastSlide}
        >
            <MdChevronRight className="text-white text-3xl" />
        </button>
    );
};

const FeaturedToday: React.FC = () => {
    const { data: movies, isLoading, error } = usePopularMovies();
    const { user } = useAuth();
    const { isWatchlist, toggleWatchlist } = useWatchlist();

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    if (isLoading) {
        return (
            <Slider {...settings}>
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="px-2">
                        <SkeletonLoader />
                    </div>
                ))}
            </Slider>
        );
    }

    if (error) {
        return <div>Error loading featured movies: {(error as Error).message}</div>;
    }

    return (
        <div>
            <div className="relative ">
                <Slider {...settings} className="px-0">
                    {movies?.slice(0, 16).map((movie) => (
                        <div key={movie.id} className="px-2">
                            <MovieCard
                                movie={movie}
                                IsWatchlist={isWatchlist(movie.id)}
                                onToggleWatchlist={() => toggleWatchlist(movie)}
                                isAuthenticated={!!user}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default FeaturedToday;

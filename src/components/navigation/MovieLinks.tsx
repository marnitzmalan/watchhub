import React from "react";
import { Link } from "react-router-dom";

interface MovieLinksProps {
    onClick?: () => void;
    className?: string;
}

const MovieLinks: React.FC<MovieLinksProps> = ({ onClick, className }) => {
    const links = [
        { to: "/movies/popular", text: "Popular Movies" },
        // { to: "/movies/top-rated", text: "Top Rated Movies" },
        // { to: "/movies/upcoming", text: "Upcoming Releases" },
        { to: "/movies/now-playing", text: "Now Playing" },
        // { to: "/movies/age-rating", text: "Filter by Age Rating" },
        // { to: "/movies/genre", text: "Filter by Genre" },
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClick}
                    className={
                        className ||
                        "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    }
                >
                    {link.text}
                </Link>
            ))}
        </>
    );
};

export default MovieLinks;

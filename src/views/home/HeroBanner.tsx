import React from "react";
import { Link } from "react-router-dom";

const HeroBanner: React.FC = () => {
    return (
        <section className="bg-gray-900 text-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                        Welcome to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            WatchHub
                        </span>
                    </h1>
                    <p className="text-xl mb-10 font-light text-gray-300">
                        Your ultimate destination for
                        <span className="font-semibold"> discovering</span>,
                        <span className="font-semibold"> tracking</span>, and
                        <span className="font-semibold"> enjoying</span>
                        <br />
                        the best in movies and TV shows.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/login"
                            className="bg-purple-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-purple-700 transition duration-300 shadow-lg"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/movies"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-gray-900 transition duration-300"
                        >
                            Browse Movies
                        </Link>
                        <Link
                            to="/series"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-gray-900 transition duration-300"
                        >
                            Browse Series
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;

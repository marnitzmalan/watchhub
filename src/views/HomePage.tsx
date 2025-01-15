import { usePopularMovies } from "@/api/movies";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
    const { isLoading, error } = usePopularMovies();
    const { user } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="bg-white text-gray-900 min-h-screen">
            {!user && (
                // Hero Section (only shown when user is logged out)
                <section className="bg-gray-900 text-white w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">WatchHub</span>
                            </h1>
                            <p className="text-xl mb-10 font-light text-gray-300">
                                Your ultimate destination for
                                <span className="font-semibold"> discovering</span>,
                                <span className="font-semibold"> tracking</span>, and
                                <span className="font-semibold"> enjoying</span>
                                <br/>
                                the best in movies and TV shows.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/login"
                                      className="bg-purple-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-purple-700 transition duration-300 shadow-lg">
                                    Sign Up
                                </Link>
                                <Link to="/movies"
                                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-gray-900 transition duration-300">
                                    Browse Movies
                                </Link>
                                <Link to="/series"
                                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-gray-900 transition duration-300">
                                    Browse Series
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <div className="container mx-auto px-4 py-8">
                {/* Featured Today Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Featured Today
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Featured Today content</p>
                    </div>
                </section>

                {/* Top 10 on IMDb This Week Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Top 10 on IMDb This Week
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Top 10 on IMDb This Week</p>
                    </div>
                </section>

                {/* What to Watch Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        What to Watch
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for What to Watch recommendations</p>
                    </div>
                </section>

                {/* From Your Watchlist Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        From Your Watchlist
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Watchlist items</p>
                    </div>
                </section>

                {/* Explore Movies & TV Shows Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Explore Movies & TV Shows
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Movie and TV Show exploration</p>
                    </div>
                </section>

                {/* Top Box Office Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Top Box Office
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Top Box Office data</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
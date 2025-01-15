import { usePopularMovies } from "@/api/movies";
import { useAuth } from "@/hooks/useAuth";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedToday from "@/components/home/FeaturedToday";
import TopTenMovies from "@/components/home/TopTenMovies";
import PopularCelebrities from "@/components/home/PopularCelebrities";

const HomePage = () => {
    const { isLoading, error } = usePopularMovies();
    const { user } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="bg-white text-gray-900 min-h-screen">
            {!user && <HeroBanner />}

            <div className="container mx-auto px-4 py-8">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Featured Today
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <FeaturedToday/>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Top 10 on IMDb This Week
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <TopTenMovies/>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Most Popular Celebrities
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <PopularCelebrities/>
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
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
                    </h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Movie and TV Show exploration</p>
                    </div>
                </section>

                {/* Top Box Office Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 relative inline-block">
                        Top Box Office
                        <span
                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></span>
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
import { usePopularMovies } from "@/hooks/usePopularMovies.ts";
import { useAuth } from "@/hooks/useAuth";
import HeroBanner from "@/views/Home/HeroBanner";
import FeaturedToday from "@/views/Home/FeaturedToday";
import TopTenMovies from "@/views/Home/TopTenMovies";
import PopularCelebrities from "@/views/Home/PopularCelebrities";
import AppHeader from "@/components/ui/AppHeader.tsx";

const HomePage = () => {
    const { isLoading, error } = usePopularMovies();
    const { user } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="min-h-screen">
            {!user && <HeroBanner />}

            <div className="container mx-auto px-4 py-8">
                <section className="mb-12">
                    <AppHeader title="Featured Today" />
                    <FeaturedToday />
                </section>

                <section className="mb-12">
                    <AppHeader title="Top 10 on IMDb This Week" />
                    <TopTenMovies />
                </section>

                <section className="mb-12">
                    <AppHeader title="Most Popular Celebrities" />
                    <PopularCelebrities />
                </section>

                {/* From Your Favourite Section */}
                <section className="mb-12">
                    <AppHeader title="From Your Favourite" />
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Favourite items</p>
                    </div>
                </section>

                {/* Explore Movies & TV Shows Section */}
                <section className="mb-12">
                    <AppHeader title="Explore Movies & TV Shows" />
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Movie and TV Show exploration</p>
                    </div>
                </section>

                {/* Top Box Office Section */}
                <section className="mb-12">
                    <AppHeader title="Top Box Office" />
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Top Box Office data</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;

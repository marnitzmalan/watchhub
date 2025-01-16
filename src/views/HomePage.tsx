import { usePopularMovies } from "@/api/movies";
import { useAuth } from "@/hooks/useAuth";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedToday from "@/components/home/FeaturedToday";
import TopTenMovies from "@/components/home/TopTenMovies";
import PopularCelebrities from "@/components/home/PopularCelebrities";
import SectionHeader from "@/components/ui/SectionHeader";

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
                    <SectionHeader title="Featured Today" />
                    <FeaturedToday />
                </section>

                <section className="mb-12">
                    <SectionHeader title="Top 10 on IMDb This Week" />
                    <TopTenMovies />
                </section>

                <section className="mb-12">
                    <SectionHeader title="Most Popular Celebrities" />
                    <PopularCelebrities />
                </section>

                {/* What to Watch Section */}
                <section className="mb-12">
                    <SectionHeader title="What to Watch" />
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for What to Watch recommendations</p>
                    </div>
                </section>

                {/* From Your Watchlist Section */}
                <section className="mb-12">
                    <SectionHeader title="From Your Watchlist" />
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Watchlist items</p>
                    </div>
                </section>

                {/* Explore Movies & TV Shows Section */}
                <section className="mb-12">
                    <SectionHeader title="Explore Movies & TV Shows" />
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Movie and TV Show exploration</p>
                    </div>
                </section>

                {/* Top Box Office Section */}
                <section className="mb-12">
                    <SectionHeader title="Top Box Office" />
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <p>Placeholder for Top Box Office data</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;

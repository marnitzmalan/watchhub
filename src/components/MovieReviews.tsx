import React from "react";
import { useMovieReviews } from "@/hooks/useMovieReviews.ts";
import { IReview } from "@/types/Review";

interface MovieReviewsProps {
    movieId: number;
}

const MovieReviews: React.FC<MovieReviewsProps> = ({ movieId }) => {
    const { data: reviews, isLoading } = useMovieReviews(movieId);

    if (isLoading) return <div>Loading reviews...</div>;

    return (
        <div className="mt-8">
            {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review: IReview) => (
                        <div key={review.id} className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-bold">{review.author}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {new Date(review.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-sm">
                                {review.content.length > 300
                                    ? `${review.content.substring(0, 300)}...`
                                    : review.content}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available for this movie.</p>
            )}
        </div>
    );
};

export default MovieReviews;

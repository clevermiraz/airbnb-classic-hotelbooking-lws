import { auth } from "@/auth";
import { getReviewsForAHotel, getUserRatingForHotel } from "@/db/queries";
import { getHotelAvgRating } from "@/lib/hotelReviewRating";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import WriteAReview from "./WriteAReview";

export default async function ReviewSection({ hotelId }) {
    const avgRating = await getHotelAvgRating(hotelId);
    const { totalReviews, reviews } = await getReviewsForAHotel(hotelId);
    const session = await auth();

    const reviewsWithRatings = await Promise.all(
        reviews.map(async (review) => {
            const userRating = await getUserRatingForHotel(hotelId, review?.userId?._id); // Get the rating for the specific user
            return {
                ...review,
                rating: userRating, // Add the rating to the review
            };
        })
    );

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-12 border-t">
                {/* <!-- Reviews Header with Average Rating --> */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-semibold">Reviews</h2>
                        <div className="flex items-center">
                            <i className="fas fa-star text-yellow-500 mr-2"></i>
                            <span className="text-xl font-semibold">{avgRating}</span>
                            <span className="mx-2">·</span>
                            <span className="text-gray-600">{totalReviews} reviews</span>
                        </div>
                    </div>

                    <WriteAReview userId={session?.user?._id} hotelId={hotelId} />
                </div>

                {/* <!-- Reviews Grid --> */}
                <div className="grid grid-cols-2 gap-8">
                    {/* <!-- Review Card 1 --> */}
                    {reviewsWithRatings.map((review) => (
                        <div key={review?.id} className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                    <Image
                                        width={48}
                                        height={48}
                                        src="https://avatar.iran.liara.run/public/boy?username=Ash"
                                        alt="User avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium">{review?.userId?.name}</h4>
                                    <p className="text-gray-500 text-sm">{formatDate(review?.createdAt)}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <i
                                        key={index}
                                        className={`fas fa-star ${
                                            index < review?.rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                    ></i>
                                ))}
                            </div>

                            <p className="text-gray-600 leading-relaxed">{review?.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

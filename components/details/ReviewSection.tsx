import { getReviewsForAHotel } from "@/db/queries";
import { getHotelAvgRating } from "@/lib/hotelReviewRating";
import Image from "next/image";
import WriteAReview from "./WriteAReview";

export default async function ReviewSection({ hotelId }) {
    const avgRating = await getHotelAvgRating(hotelId);
    const { totalReviews } = await getReviewsForAHotel(hotelId);

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

                    <WriteAReview />
                </div>

                {/* <!-- Reviews Grid --> */}
                <div className="grid grid-cols-2 gap-8">
                    {/* <!-- Review Card 1 --> */}
                    <div className="space-y-4">
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
                                <h4 className="font-medium">John Smith</h4>
                                <p className="text-gray-500 text-sm">December 2024</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Amazing stay! The villa exceeded our expectations. The private pool and beach access were
                            highlights of our trip. Sarah was an excellent host, always responsive and helpful.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

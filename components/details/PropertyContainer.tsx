import { getReviewsForAHotel } from "@/db/queries";
import { getHotelAvgRating } from "@/lib/hotelReviewRating";
import BookingCard from "./BookingCard";
import Gallery from "./Gallery";

export default async function PropertyContainer({ hotelInfo }) {
    const avgRating = await getHotelAvgRating(hotelInfo?.id);
    const { totalReviews } = await getReviewsForAHotel(hotelInfo?.id);

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* <!-- Property Title and Rating --> */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">{hotelInfo?.name}</h1>
                    <div className="flex items-center text-gray-600">
                        <i className="fas fa-star text-yellow-500 mr-1"></i>
                        <span>{avgRating} · </span>
                        <span className="ml-2">{totalReviews} reviews</span>
                        <span className="mx-2">·</span>
                        <span className="">{hotelInfo?.location}</span>
                    </div>
                </div>

                {/* <!-- Image Gallery --> */}
                <Gallery hotelInfo={hotelInfo} />

                {/* <!-- Property Details --> */}
                <div className="grid grid-cols-3 gap-8">
                    {/* <!-- Left Column: Property Description --> */}
                    <div className="col-span-2">
                        <div className="border-b pb-6 mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Entire villa hosted by {hotelInfo?.owner}</h2>
                            <div className="grid grid-cols-3 gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-person"></i>
                                    <span>{hotelInfo?.totalGuests} guests</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-door-open"></i>
                                    <span>{hotelInfo?.totalRooms} bedrooms</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-bed"></i>
                                    <span>{hotelInfo?.totalBeds} beds</span>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Description --> */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">About this place</h3>
                            <p className="text-gray-700 leading-relaxed">{hotelInfo?.description}</p>
                        </div>

                        {/* <!-- Amenities --> */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {hotelInfo?.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <i className="fa-solid fa-umbrella-beach"></i>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* <!-- Right Column: Booking Card --> */}
                    <BookingCard hotelInfo={hotelInfo} avgRating={avgRating} />
                </div>
            </div>
        </>
    );
}

import { getRatingsForAHotel } from "@/db/queries";

export default async function HotelRating({ hotelId }) {
    const rating = await getRatingsForAHotel(hotelId);

    // const getRatingDescription = (avgRating) => {
    //     if (avgRating === 0) {
    //         return "No Ratings Available";
    //     } else if (avgRating > 0 && avgRating <= 2) {
    //         return "Poor";
    //     } else if (avgRating > 2 && avgRating <= 3) {
    //         return "Average";
    //     } else if (avgRating > 3 && avgRating <= 4) {
    //         return "Good";
    //     } else if (avgRating > 4) {
    //         return "Very Good";
    //     }
    // };

    let avgRating = 0;

    if (rating.length === 1) {
        avgRating = rating[0].rating;
    }
    if (rating.length > 1) {
        avgRating =
            rating.reduce((item, currentValue) => {
                return item.rating + currentValue.rating;
            }) / rating.length;
    }

    return (
        <>
            <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-zinc-600">{avgRating}</span>
            </div>
        </>
    );
}

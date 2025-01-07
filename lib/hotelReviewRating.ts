import { getRatingsForAHotel } from "@/db/queries";

export async function getHotelAvgRating(hotelId) {
    const rating = await getRatingsForAHotel(hotelId);

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

    return avgRating;
}

import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/mongoDataInShape";
import { HotelModel } from "@/models/hotel-model";
import { RatingModel } from "@/models/rating-model";
import { ReviewModel } from "@/models/review-model";

export async function getAllHotels() {
    const hotels = await HotelModel.find()
        .select(["name", "location", "pricePerNight", "totalRoom", "availableRooms", "thumbNailUrl"])
        .lean();

    return replaceMongoIdInArray(hotels);
}

export async function getHotelById(hotelId) {
    const hotel = await HotelModel.findById(hotelId).lean();
    return replaceMongoIdInObject(hotel);
}

export async function getRatingsForAHotel(hotelId) {
    const ratings = await RatingModel.find({ hotelId: hotelId }).lean();
    return replaceMongoIdInArray(ratings);
}

export async function getReviewsForAHotel(hotelId) {
    const reviews = await ReviewModel.find({ hotelId: hotelId }).lean();
    return replaceMongoIdInArray(reviews);
}

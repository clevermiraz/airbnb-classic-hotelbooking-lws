import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/mongoDataInShape";
import { HotelModel } from "@/models/hotel-model";
import { RatingModel } from "@/models/rating-model";
import { ReviewModel } from "@/models/review-model";

export async function getAllHotels(page = 1, limit = 8) {
    const skip = (page - 1) * limit;

    const hotels = await HotelModel.find()
        .select(["name", "location", "pricePerNight", "totalRooms", "availableRooms", "thumbNailUrl"])
        .skip(skip)
        .limit(limit)
        .lean();

    const totalHotels = await HotelModel.countDocuments();

    return {
        hotels: replaceMongoIdInArray(hotels),
        totalHotels,
    };
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

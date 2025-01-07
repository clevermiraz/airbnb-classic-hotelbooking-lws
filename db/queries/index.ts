import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/mongoDataInShape";
import { HotelModel } from "@/models/hotel-model";
import { RatingModel } from "@/models/rating-model";
import { ReviewModel } from "@/models/review-model";
import connectMongoDB from "../mongodb";

export async function getAllHotels(page = 1, limit = 8) {
    await connectMongoDB();

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
    await connectMongoDB();

    const hotel = await HotelModel.findById(hotelId).lean();
    return replaceMongoIdInObject(hotel);
}

export async function getRatingsForAHotel(hotelId) {
    await connectMongoDB();

    const ratings = await RatingModel.find({ hotelId: hotelId }).lean();
    return replaceMongoIdInArray(ratings);
}

export async function getReviewsForAHotel(hotelId) {
    await connectMongoDB();

    const reviews = await ReviewModel.find({ hotelId: hotelId }).lean();
    const totalReviews = await ReviewModel.countDocuments();

    return {
        reviews: replaceMongoIdInArray(reviews),
        totalReviews,
    };
}

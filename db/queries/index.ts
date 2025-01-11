import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/mongoDataInShape";
import { BookingModel } from "@/models/booking-model";
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

    const reviews = await ReviewModel.find({ hotelId: hotelId }).populate("userId", "name").lean();
    const totalReviews = await ReviewModel.countDocuments({ hotelId: hotelId });

    return {
        reviews: replaceMongoIdInArray(reviews),
        totalReviews,
    };
}

export async function getUserRatingForHotel(hotelId, userId) {
    const rating = await RatingModel.findOne({ hotelId, userId }).lean();
    return rating ? rating.rating : null; // Return the rating or null if not found
}

interface CreateReviewRatingInput {
    userId: string;
    hotelId: string;
    review: string;
    rating: number;
}

export async function createAReviewRating({ userId, hotelId, review, rating }: CreateReviewRatingInput) {
    try {
        await connectMongoDB();

        // Validate input
        if (!userId || !hotelId || typeof review !== "string" || typeof rating !== "number") {
            throw new Error("Invalid input. Ensure all required fields are provided and valid.");
        }

        // Check if the user has already submitted a rating/review for this hotel
        const existingRating = await RatingModel.findOne({ userId, hotelId });
        const existingReview = await ReviewModel.findOne({ userId, hotelId });

        if (existingRating || existingReview) {
            throw new Error("You have already submitted a review or rating for this hotel.");
        }

        // Create the rating document
        const ratingDoc = await RatingModel.create({
            userId,
            hotelId,
            rating,
        });

        // Create the review document
        const reviewDoc = await ReviewModel.create({
            userId,
            hotelId,
            review,
        });

        return { rating: ratingDoc, review: reviewDoc };
    } catch (error) {
        console.error("Error creating review and rating:", error.message);
        throw new Error(error.message);
    }
}

export async function deleteReviewRatingFromDB(reviewId: string, userId: string) {
    try {
        await connectMongoDB();

        // Validate input
        if (!reviewId || !userId) {
            throw new Error("Invalid input. Both reviewId and userId are required.");
        }

        // Check if the review exists
        const existingReview = await ReviewModel.findOne({ _id: reviewId, userId });
        if (!existingReview) {
            throw new Error("No review found with the provided reviewId for this user.");
        }

        // Check if the associated rating exists
        const existingRating = await RatingModel.findOne({
            userId,
            hotelId: existingReview.hotelId, // Use the hotelId from the existing review
        });

        // Delete the review
        await ReviewModel.deleteOne({ _id: reviewId, userId });

        // Delete the associated rating if it exists
        if (existingRating) {
            await RatingModel.deleteOne({ userId, hotelId: existingReview.hotelId });
        }

        return { success: true, message: "Review and rating deleted successfully." };
    } catch (error) {
        console.error("Error deleting review and rating:", error.message);
        return { success: false, message: error.message };
    }
}

export async function getBookingDetails(bookingId) {
    await connectMongoDB();

    // Use `findOne` to fetch a single booking and populate specific hotel fields
    const booking = await BookingModel.findOne({ _id: bookingId })
        .populate("userId") // Populate userId (all fields or specific fields if needed)
        .populate("hotelId", "name description thumbNailUrl") // Populate specific fields from the Hotel model
        .lean();

    return booking;
}

import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        hotelId: {
            required: true,
            type: ObjectId,
        },
        userId: {
            required: true,
            type: ObjectId,
            ref: "User",
        },
        review: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

export const ReviewModel = mongoose.models.reviews ?? mongoose.model("reviews", reviewSchema);

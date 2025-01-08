import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ratingSchma = new Schema(
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
        rating: {
            required: true,
            type: Number,
        },
    },
    { timestamps: true }
);

export const RatingModel = mongoose.models.ratings ?? mongoose.model("ratings", ratingSchma);

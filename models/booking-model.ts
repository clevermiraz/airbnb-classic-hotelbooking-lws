import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    hotelId: {
        type: ObjectId,
        required: true,
        ref: "Hotel", // Reference to the Hotel model
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "User", // Reference to the User model
    },
    bookingDate: {
        type: Date,
        required: true,
        default: Date.now, // Default to the current date
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update `updatedAt` on document updates
bookingSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

export const BookingModel = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

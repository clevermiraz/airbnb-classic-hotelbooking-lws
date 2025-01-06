import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: String,
        required: true,
        trim: true,
    },
    pricePerNight: {
        type: Number,
        required: true,
        min: 0,
    },
    totalGuests: {
        type: Number,
        required: true,
        min: 0,
    },
    totalBeds: {
        type: Number,
        required: true,
        min: 0,
    },
    totalRooms: {
        type: Number,
        required: true,
        min: 0,
    },
    availableRooms: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function (value) {
                return value <= this.totalRooms;
            },
            message: "Available rooms cannot exceed total rooms.",
        },
    },
    thumbNailUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(http|https):\/\/[^ "]+$/.test(value);
            },
            message: "Invalid thumbnail URL.",
        },
    },
    gallery: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every((url) => /^(http|https):\/\/[^ "]+$/.test(url));
            },
            message: "All gallery URLs must be valid.",
        },
    },
    amenities: {
        type: [String],
        default: [],
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
hotelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

export const HotelModel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);

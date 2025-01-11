import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
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
        checkIn: {
            type: Date,
            required: true, // Check-in date
            validate: {
                validator: function (value) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
                    return value >= today; // Allow today or future dates
                },
                message: "Check-in date cannot be in the past.",
            },
        },
        checkOut: {
            type: Date,
            required: true, // Check-out date
            validate: {
                validator: function (value) {
                    return value > this.checkIn; // Check-out must be after check-in
                },
                message: "Check-out date must be after check-in date.",
            },
        },
        totalGuests: {
            type: Number,
            required: true,
            min: [1, "Minimum guest count must be 1"], // Minimum guest count
        },
        totalBill: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= 0; // Ensure totalBill is a positive number
                },
                message: "Total bill must be a positive amount.",
            },
        },
        paymentDetails: {
            cardNumber: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        return /^\d{16}$/.test(value); // Validate card number format (16 digits)
                    },
                    message: "Invalid card number format.",
                },
            },
            expirationDate: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        return /^\d{2}\/\d{2}$/.test(value); // Validate MM/YY format
                    },
                    message: "Invalid expiration date format. Use MM/YY.",
                },
            },
            cvv: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        return /^\d{3,4}$/.test(value); // Validate CVV (3 or 4 digits)
                    },
                    message: "Invalid CVV format.",
                },
            },
        },
        billingAddress: {
            street: {
                type: String,
                required: true,
            },
            apartment: {
                type: String,
                required: false, // Optional
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zipCode: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        return /^\d{4}(-\d{4})?$/.test(value); // Validate ZIP code format
                    },
                    message: "Invalid ZIP code format.",
                },
            },
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Booking model
export const BookingModel = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

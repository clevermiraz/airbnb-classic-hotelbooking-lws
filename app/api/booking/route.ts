import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import connectMongoDB from "@/db/mongodb";
import { BookingModel } from "@/models/booking-model";

export async function POST(request: NextRequest) {
    try {
        const { hotelId, userId, checkIn, checkOut, totalGuests, totalBill, paymentDetails, billingAddress } =
            await request.json();

        // Validate required fields
        if (
            !hotelId ||
            !userId ||
            !checkIn ||
            !checkOut ||
            !totalGuests ||
            !totalBill ||
            !paymentDetails?.cardNumber ||
            !paymentDetails?.expirationDate ||
            !paymentDetails?.cvv ||
            !billingAddress?.street ||
            !billingAddress?.city ||
            !billingAddress?.state ||
            !billingAddress?.zipCode
        ) {
            return NextResponse.json({ message: "All required fields must be provided." }, { status: 400 });
        }

        // Connect to MongoDB
        await connectMongoDB();

        // Prepare the payload
        const payload = {
            hotelId: new mongoose.Types.ObjectId(hotelId),
            userId: new mongoose.Types.ObjectId(userId),
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            totalGuests,
            totalBill,
            paymentDetails: {
                cardNumber: paymentDetails.cardNumber,
                expirationDate: paymentDetails.expirationDate,
                cvv: paymentDetails.cvv,
            },
            billingAddress: {
                street: billingAddress.street,
                apartment: billingAddress.apartment || null, // Optional
                city: billingAddress.city,
                state: billingAddress.state,
                zipCode: billingAddress.zipCode,
            },
        };

        // Create the booking
        const newBooking = await BookingModel.create(payload);

        return NextResponse.json({ message: "Booking created successfully.", booking: newBooking }, { status: 201 });
    } catch (err) {
        console.error("Error creating booking:", err);
        return NextResponse.json({ message: "An error occurred while creating the booking." }, { status: 500 });
    }
}

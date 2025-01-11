"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

export default function PaymentForm({ userId, hotelId, checkIn, checkOut, totalGuests }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cvv, setCvv] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [aptNumber, setAptNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [isEditingDates, setIsEditingDates] = useState(false);
    const [isEditingGuests, setIsEditingGuests] = useState(false);
    const [editableCheckIn, setEditableCheckIn] = useState(new Date(checkIn));
    const [editableCheckOut, setEditableCheckOut] = useState(new Date(checkOut));
    const [editableGuests, setEditableGuests] = useState(totalGuests);

    const router = useRouter();

    const handleSaveDates = () => {
        setIsEditingDates(false);
    };

    const handleSaveGuests = () => {
        setIsEditingGuests(false);
    };

    const handleRequestBook = async (e) => {
        e.preventDefault();

        // Check if check-in and check-out dates are valid
        const checkInDate = new Date(editableCheckIn);
        const checkOutDate = new Date(editableCheckOut);

        // Validate dates
        checkInDate.setHours(0, 0, 0, 0);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Validate check-in date
        if (checkInDate < currentDate) {
            toast.error("Check-in date cannot be in the past.");
            return;
        }

        if (checkOutDate <= checkInDate) {
            toast.error("Check-out date must be after the check-in date.");
            return;
        }

        // Ensure at least 1 guest is required
        if (editableGuests < 1) {
            toast.error("At least 1 guest is required.");
            return;
        }

        // Validate card number format (16 digits)
        if (!/^\d{16}$/.test(cardNumber)) {
            toast.error("Invalid card number format.");
            return;
        }

        // Validate expiration date format (MM/YY)
        if (!/^\d{2}\/\d{2}$/.test(expiration)) {
            toast.error("Invalid expiration date format. Use MM/YY.");
            return;
        }

        // Validate CVV format (3 or 4 digits)
        if (!/^\d{3,4}$/.test(cvv)) {
            toast.error("Invalid CVV format.");
            return;
        }

        // Validate ZIP code format
        if (!/^\d{4}(-\d{4})?$/.test(zipCode)) {
            toast.error("Invalid ZIP code format.");
            return;
        }

        // Ensure all required fields are provided
        if (!hotelId) {
            toast.error("Hotel ID is required.");
            return;
        }

        if (!userId) {
            toast.error("User ID is required.");
            return;
        }

        if (!streetAddress) {
            toast.error("Street address is required.");
            return;
        }

        if (!city) {
            toast.error("City is required.");
            return;
        }

        if (!state) {
            toast.error("State is required.");
            return;
        }

        if (!zipCode) {
            toast.error("ZIP code is required.");
            return;
        }

        // Prepare the booking data
        const bookingData = {
            hotelId,
            userId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            totalGuests: editableGuests,
            totalBill: 300,
            paymentDetails: {
                cardNumber,
                expirationDate: expiration,
                cvv,
            },
            billingAddress: {
                street: streetAddress,
                apartment: aptNumber,
                city,
                state,
                zipCode,
            },
        };

        try {
            // Assuming `axiosInstance` is configured with proper base URL
            const response = await axiosInstance.post("/api/booking", bookingData);

            if (response?.status === 201) {
                toast.success("Booking request successful!");
            }

            router.push(`/details/${hotelId}/payment-process/success/?bookingId=${response?.data?.booking?._id}`);
        } catch (error) {
            toast.error("Booking failed, please try again.");
            console.error(error);
        }
    };

    return (
        <div>
            {/* Trip Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Your trip</h2>

                {/* Dates */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="font-medium">Dates</h3>
                        {isEditingDates ? (
                            <div className="space-y-2">
                                <DatePicker
                                    selected={editableCheckIn}
                                    onChange={(date) => setEditableCheckIn(date)}
                                    className="p-2 border rounded"
                                    dateFormat="yyyy-MM-dd"
                                />
                                <DatePicker
                                    selected={editableCheckOut}
                                    onChange={(date) => setEditableCheckOut(date)}
                                    className="p-2 border rounded"
                                    dateFormat="yyyy-MM-dd"
                                />

                                <button
                                    onClick={handleSaveDates}
                                    className="ml-2 px-2 py-1 bg-primary text-white rounded-lg hover:brightness-90"
                                >
                                    <i className="fas fa-save mr-2"></i>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <p className="text-zinc-600 text-sm">
                                {editableCheckIn.toLocaleDateString()} - {editableCheckOut.toLocaleDateString()}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditingDates(!isEditingDates)}
                        className="text-zinc-800 underline text-sm"
                    >
                        {isEditingDates ? "Cancel" : "Edit"}
                    </button>
                </div>

                {/* Guests */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium">Guests</h3>
                        {isEditingGuests ? (
                            <div>
                                <input
                                    type="number"
                                    min="1"
                                    value={editableGuests}
                                    onChange={(e) => setEditableGuests(e.target.value)}
                                    className="p-2 border rounded w-16"
                                />

                                <button
                                    onClick={handleSaveGuests}
                                    className="ml-2 px-2 py-1 bg-primary text-white rounded-lg hover:brightness-90"
                                >
                                    <i className="fas fa-save mr-2"></i>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <p className="text-zinc-600 text-sm">{editableGuests} guest(s)</p>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditingGuests(!isEditingGuests)}
                        className="text-zinc-800 underline text-sm"
                    >
                        {isEditingGuests ? "Cancel" : "Edit"}
                    </button>
                </div>
            </section>

            {/* Payment Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Pay with American Express</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Expiration"
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                            className="p-3 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="p-3 border rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Billing Address */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Billing address</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Street address"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Apt or suite number"
                        value={aptNumber}
                        onChange={(e) => setAptNumber(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="p-3 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="ZIP code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="p-3 border rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Book Button */}
            <button
                onClick={handleRequestBook}
                className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
            >
                Request to book
            </button>
        </div>
    );
}

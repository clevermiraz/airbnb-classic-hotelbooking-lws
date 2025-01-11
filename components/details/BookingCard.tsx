"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

export default function BookingCard({ hotelInfo, avgRating }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });
    const [totalGuest, setTotalGuest] = useState(0);

    const router = useRouter();

    const handleReserve = (e) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            toast.error("Please select valid check-in and check-out dates.");
            return;
        }

        if (!totalGuest || totalGuest <= 0) {
            toast.error("Please enter a valid number of guests. Minimum guest count must be 1.");
            return;
        }

        if (startDate >= endDate) {
            toast.error("Check-out date must be after the check-in date.");
            return;
        }

        const queryParams = new URLSearchParams({
            checkIn: startDate.toISOString(),
            checkOut: endDate.toISOString(),
            totalGuests: totalGuest,
        }).toString();

        router.push(`/details/${hotelInfo?.id}/payment-process?${queryParams}`);
        toast.success("Reservation details confirmed! Redirecting to payment.");
    };

    return (
        <div>
            <div className="bg-white shadow-lg rounded-xl p-6 border">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="text-xl font-bold">${hotelInfo?.pricePerNight}</span>
                        <span className="text-gray-600 ml-1">per night</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-star text-yellow-500 mr-1"></i>
                        <span>{avgRating}</span>
                    </div>
                </div>

                <form>
                    <div className="border rounded-lg mb-4">
                        <div className="grid grid-cols-2 border-b">
                            <DatePicker
                                placeholderText={"Check In"}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="p-3 border-r"
                            />

                            <DatePicker
                                placeholderText={"Check Out"}
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="p-3"
                            />
                        </div>
                        <input
                            value={totalGuest}
                            onChange={(e) => setTotalGuest(e.target.value)}
                            type="number"
                            placeholder="Guests"
                            className="w-full p-3"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleReserve}
                        className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
                    >
                        Reserve
                    </button>
                </form>

                <div className="text-center mt-4 text-gray-600">
                    <p>You won&apos;t be charged yet</p>
                </div>
            </div>
        </div>
    );
}

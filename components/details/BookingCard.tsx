"use client";

import Link from "next/link";
import { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function BookingCard({ hotelInfo, avgRating }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });

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
                    <input type="number" placeholder="Guests" className="w-full p-3" />
                </div>

                <Link
                    href="/payment-process"
                    className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
                >
                    Reserve
                </Link>

                <div className="text-center mt-4 text-gray-600">
                    <p>You won&apos;t be charged yet</p>
                </div>
            </div>
        </div>
    );
}

"use client";

import Loader from "@/components/Loader";
import { generatePDF } from "@/lib/generatePDF";
import { useState } from "react";

export default function DownloadReceipt({ bookingInfo }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownloadReceipt = async () => {
        try {
            setIsLoading(true);
            await generatePDF(bookingInfo);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownloadReceipt}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
        >
            {!isLoading ? (
                <>
                    <i className="fas fa-download mr-2"></i>
                    Download Receipt
                </>
            ) : (
                <Loader />
            )}
        </button>
    );
}

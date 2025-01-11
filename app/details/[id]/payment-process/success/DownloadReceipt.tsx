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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={handleDownloadReceipt}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-90"
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
        </div>
    );
}

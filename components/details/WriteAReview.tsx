"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal";

export default function WriteAReview() {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100"
            >
                Write a Review
            </button>

            {isReviewModalOpen && <ReviewModal onModalClose={() => setIsReviewModalOpen(false)} />}
        </>
    );
}

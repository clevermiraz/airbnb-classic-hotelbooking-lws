"use client";

import { createReviewRating } from "@/actions";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Loader from "../Loader";

interface ReviewModalProps {
    onModalClose: () => void;
    userId: string;
    hotelId: string;
}

export default function ReviewModal({ onModalClose, userId, hotelId }: ReviewModalProps) {
    const reviewModalRef = useRef<HTMLDivElement>(null);
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useOnClickOutside(reviewModalRef, () => {
        onModalClose();
    });

    const handleWriteAReview = async () => {
        if (!userId) {
            toast("You're not signed in. Please log in.", {
                action: (
                    <Link
                        href={"/login"}
                        className="inline-block px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                    >
                        Login
                    </Link>
                ),
            });
            return;
        }

        if (!hotelId || !review || !rating) {
            toast.error("All fields are required!");
            return;
        }

        try {
            setIsLoading(true);

            const result = await createReviewRating({ userId, hotelId, review, rating });

            if (result?.success) {
                toast.success("Review submitted successfully!");
                router.refresh();
                onModalClose();
            } else {
                toast.error(result.error || "Failed to submit the review.");
            }
        } catch (error) {
            toast.error("An error occurred while submitting the review.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div ref={reviewModalRef} className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden">
                {/* Modal Header */}
                <div className="border-b p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Write a Review</h3>
                        <button className="text-gray-400 hover:text-gray-600" onClick={onModalClose}>
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Overall Rating */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Overall Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className={`text-2xl ${
                                            star <= rating ? "text-yellow-500" : "text-gray-300"
                                        } hover:text-yellow-500 focus:outline-none`}
                                    >
                                        <i className="fas fa-star"></i>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Review Text */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Your Review</label>
                            <textarea
                                rows={4}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Share your experience with other travelers..."
                                className="w-full px-4 py-3 rounded-lg border focus:border-gray-500 focus:ring-0 resize-none"
                            ></textarea>
                        </div>
                    </form>
                </div>

                {/* Modal Footer */}
                <div className="border-t p-4 bg-gray-50">
                    <div className="flex justify-end gap-4">
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={onModalClose}>
                            Cancel
                        </button>
                        <button
                            onClick={handleWriteAReview}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90"
                        >
                            {!isLoading ? "Submit Review" : <Loader />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

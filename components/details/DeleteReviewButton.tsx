"use client";

import { deleteReviewRating } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteReviewButton({ reviewId, userId }) {
    const router = useRouter();

    const handleDeleteReview = async (reviewId, userId) => {
        if (confirm("Are you sure you want to delete this review?")) {
            try {
                const result = await deleteReviewRating({ reviewId, userId });

                if (result?.success) {
                    toast.success("Review deleted successfully.");
                    router.refresh();
                } else {
                    toast.error(result.error || "Failed to delete the review.");
                }
            } catch (error) {
                console.error("Error deleting review:", error);
                toast.error("An error occurred while deleting the review.");
            }
        }
    };

    return (
        <button
            onClick={() => handleDeleteReview(reviewId, userId)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition duration-200"
            title="Delete Review"
        >
            <i className="fas fa-trash-alt text-lg"></i>
        </button>
    );
}

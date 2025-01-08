"use server";

import { createAReviewRating } from "@/db/queries";

// Define the input types for the function
interface ReviewRatingInput {
    userId: string;
    hotelId: string;
    review: string;
    rating: number;
}

export async function createReviewRating({
    userId,
    hotelId,
    review,
    rating,
}: ReviewRatingInput): Promise<{ success: boolean; error?: string; data?: any }> {
    try {
        const result = await createAReviewRating({ userId, hotelId, review, rating });

        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            return {
                success: false,
                error: "Unexpected error occurred while submitting the review.",
            };
        }
    } catch (error: any) {
        // Handle errors
        return {
            success: false,
            error: error.message || "An error occurred during the API request.",
        };
    }
}

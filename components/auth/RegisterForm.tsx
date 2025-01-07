"use client";

import { useState } from "react";
import { toast } from "sonner";

import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axiosInstance";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (formData.get("password") !== formData.get("confirmPassword")) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        try {
            setIsLoading(true);

            const response = await axiosInstance.post("/api/auth/register", {
                fullName: formData.get("fullName"),
                email: formData.get("email"),
                password: formData.get("password"),
            });

            toast.success(response.data.message);
            if (response.status === 201) {
                window.location.href = "/login";
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, details } = error.response.data;

                console.log("Error", error.response);

                // Handle Zod validation errors (status 422)
                if (error.response.status === 422 && details) {
                    const validationErrors = details
                        .map((err) => err.message) // Extract error messages
                        .join(", "); // Combine them into a single string
                    toast.error(`${message}: ${validationErrors}`);
                } else {
                    // Generic server error message
                    toast.error(message || "An unexpected error occurred. Please try again.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary transition"
                >
                    {!isLoading ? "Continue" : <Loader />}
                </button>
            </form>
        </>
    );
}

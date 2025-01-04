"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Loader from "@/components/Loader";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            setIsLoading(true);

            const response = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });

            if (!response?.error) {
                toast.success("Logged in successfully");
                router.push("/");
            }
        } catch (error) {
            console.error("Failed to sign in with Google", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className="space-y-4" onSubmit={handleLogin}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
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

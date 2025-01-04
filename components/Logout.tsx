"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Logout() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signOut({
                redirectTo: "/login",
            });
        } catch (error) {
            console.error("Failed to logout", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <span onClick={handleLogout} className="w-full cursor-pointer">
                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    {isLoading ? "Logging out..." : "Logout"}
                </li>
            </span>
        </>
    );
}

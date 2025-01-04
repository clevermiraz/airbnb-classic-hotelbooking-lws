"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <>
            <span
                onClick={() => {
                    signOut({
                        redirectTo: "/login",
                    });
                }}
                className="w-full cursor-pointer"
            >
                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    Logout
                </li>
            </span>
        </>
    );
}

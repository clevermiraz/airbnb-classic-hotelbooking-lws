"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <>
            <div className="mb-8">
                <button onClick={() => router.back()} className="text-zinc-800 hover:underline">
                    <i className="fas fa-chevron-left mr-2"></i>
                    Request to book
                </button>
            </div>
        </>
    );
}

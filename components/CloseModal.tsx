"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseModal() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            id="closeModalBtn"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
            <X size={24} className="w-6 h-6" />
        </button>
    );
}

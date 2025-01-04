"use client";

import { useState } from "react";

export default function ClientToggleNavbar({ children }) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="flex items-center space-x-4 relative justify-end">
            <button>
                <i className="fas fa-language text-zinc-700 text-xl"></i>
            </button>
            <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
            >
                <i className="fas fa-bars"></i>
                <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
                    <i className="fas fa-user text-white"></i>
                </span>
            </button>
            <div className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 lg:block">
                <ul className={`${isNavOpen ? "block" : "hidden"}`}>{children}</ul>
            </div>
        </div>
    );
}

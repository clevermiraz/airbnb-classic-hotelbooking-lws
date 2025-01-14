"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = searchParams?.page ? searchParams?.page : 1;
    const searchParamsQuery = searchParams?.q ? searchParams?.q : "";

    const [query, setQuery] = useState(searchParamsQuery);
    const debouncedQuery = useDebounce(query, 500);

    // useEffect(() => {
    //     if (debouncedQuery.trim()) {
    //         router.push(`/?q=${debouncedQuery}&page=${currentPage}`);
    //     } else {
    //         // If the query is empty, remove the q parameter
    //         router.push("/");
    //     }
    // }, [debouncedQuery, router, currentPage]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the form from reloading
        if (debouncedQuery.trim()) {
            router.push(`/?q=${debouncedQuery}&page=${currentPage}`);
        } else {
            // If the query is empty, remove the q parameter
            router.push(`/`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="row-start-2 col-span-2 border-0 md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2"
        >
            <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Where to?"
                    className="px-3 bg-transparent focus:outline-none lg:col-span-3 placeholder:text-sm"
                />
            </div>

            <button
                type="submit"
                className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0"
            >
                <i className="fas fa-search text-white"></i>
            </button>
        </form>
    );
}

"use client";

import { useRouter } from "next/navigation";

export default function Pagination({ currentPage = 1, totalItems = 37, itemsPerPage = 8, query }) {
    const router = useRouter();

    // Ensure currentPage is an integer
    const currentPageNumber = parseInt(currentPage, 10);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page) => {
        if (page > 0 && page <= totalPages) {
            router.replace(`/?q=${query}&page=${page}`, { scroll: false });
        }
    };

    const renderPageNumbers = () => {
        return Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === currentPageNumber;

            return (
                <li key={page}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(page);
                        }}
                        className={`py-2 px-3 leading-tight border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 ${
                            isActive ? "bg-red-100 text-red-700 font-bold border-red-500" : "text-zinc-500 bg-white"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {page}
                    </button>
                </li>
            );
        });
    };

    return (
        <div className="mt-8 flex justify-center">
            <nav aria-label="Page navigation">
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(currentPageNumber - 1);
                            }}
                            className={`block py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 ${
                                currentPageNumber === 1 && "cursor-not-allowed opacity-50"
                            }`}
                            aria-disabled={currentPageNumber === 1}
                        >
                            <span className="sr-only">Previous</span>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    </li>
                    {renderPageNumbers()}
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(currentPageNumber + 1);
                            }}
                            className={`block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 ${
                                currentPageNumber === totalPages && "cursor-not-allowed opacity-50"
                            }`}
                            aria-disabled={currentPageNumber === totalPages}
                        >
                            <span className="sr-only">Next</span>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

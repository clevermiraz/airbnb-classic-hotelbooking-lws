import Link from "next/link";

export default function NoResultsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">No Results Found</h1>
                <p className="text-gray-600 mb-6">Sorry, we couldn’t find any results matching your search.</p>
                <Link href={"/"} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    Back To Home
                </Link>
            </div>
        </div>
    );
}

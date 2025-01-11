import HotelCard from "@/components/home/HotelCard";
import Pagination from "@/components/home/Pagination";
import { getAllHotels } from "@/db/queries";
import NoResultsPage from "./NoResultPage";

export default async function HotelList({ currentPage, query = "" }) {
    const limit = 8;

    const allHotels = await getAllHotels(currentPage, limit, query);

    return (
        <>
            {allHotels.hotels?.length > 0 ? (
                <>
                    <section className="px-6">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* Room Card */}
                            {allHotels?.hotels.map((hotel) => (
                                <HotelCard key={hotel?.id} hotelInfo={hotel} />
                            ))}
                        </div>
                    </section>

                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={limit}
                        totalItems={query ? allHotels?.hotels?.length : allHotels?.totalHotels}
                        query={query}
                    />
                </>
            ) : (
                <NoResultsPage />
            )}
        </>
    );
}

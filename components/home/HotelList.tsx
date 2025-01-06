import HotelCard from "@/components/home/HotelCard";
import Pagination from "@/components/home/Pagination";
import { getAllHotels } from "@/db/queries";

export default async function HotelList({ currentPage }) {
    const allHotels = await getAllHotels(currentPage);

    return (
        <>
            <section className="px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Room Card */}
                    {allHotels?.hotels.map((hotel) => (
                        <HotelCard key={hotel?.id} hotelInfo={hotel} />
                    ))}
                </div>
            </section>

            <Pagination currentPage={currentPage} itemsPerPage={8} totalItems={allHotels?.totalHotels} />
        </>
    );
}

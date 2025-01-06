import { getAllHotels } from "@/db/queries";
import HotelCard from "./HotelCard";

export default async function HotelList() {
    const allHotels = await getAllHotels();

    return (
        <>
            <section className="px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Room Card */}
                    {allHotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotelInfo={hotel} />
                    ))}
                </div>
            </section>
        </>
    );
}

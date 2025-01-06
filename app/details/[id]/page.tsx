import PropertyContainer from "@/components/details/PropertyContainer";
import ReviewSection from "@/components/details/ReviewSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getHotelById } from "@/db/queries";

export default async function RoomDetailPage({ params }) {
    const { id } = params;

    const hotelInfo = await getHotelById(id);

    return (
        <main className="bg-gray-50">
            <Navbar />
            <PropertyContainer hotelInfo={hotelInfo} />
            <ReviewSection />
            <Footer />
        </main>
    );
}

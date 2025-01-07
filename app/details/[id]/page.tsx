import PropertyContainer from "@/components/details/PropertyContainer";
import ReviewSection from "@/components/details/ReviewSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getHotelById } from "@/db/queries";

export async function generateMetadata({ params }) {
    const { id } = params;

    const hotelInfo = await getHotelById(id);

    return {
        title: hotelInfo?.name?.slice(0, 100),
        description: hotelInfo?.description?.slice(0, 100),
        openGraph: {
            images: [
                {
                    url: hotelInfo.thumbNailUrl,
                    width: 1200,
                    height: 600,
                },
            ],
        },
    };
}

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

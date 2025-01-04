import PropertyContainer from "@/components/details/PropertyContainer";
import ReviewSection from "@/components/details/ReviewSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RoomDetailPage() {
    return (
        <main className="bg-gray-50">
            <Navbar />
            <PropertyContainer />
            <ReviewSection />
            <Footer />
        </main>
    );
}

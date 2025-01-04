import Footer from "@/components/Footer";
import HotelList from "@/components/home/HotelList";
import Pagination from "@/components/home/Pagination";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <main>
            <Navbar />
            <HotelList />
            <Pagination />
            <Footer />
        </main>
    );
}

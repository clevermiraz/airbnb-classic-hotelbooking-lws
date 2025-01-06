import Footer from "@/components/Footer";
import HotelList from "@/components/home/HotelList";
import Navbar from "@/components/Navbar";

export default function Home({ searchParams }) {
    const currentPage = searchParams?.page ? searchParams?.page : 1;

    return (
        <main>
            <Navbar />
            <HotelList currentPage={currentPage} />
            <Footer />
        </main>
    );
}

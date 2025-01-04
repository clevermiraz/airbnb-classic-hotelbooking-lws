import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/payment-process/PaymentForm";
import PropertyDetail from "@/components/payment-process/PropertyDetail";
import Link from "next/link";

export default function PaymentProcessPage() {
    return (
        <main className="bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* <!-- Back Button --> */}
                <div className="mb-8">
                    <Link href="/details/1" className="text-zinc-800 hover:underline">
                        <i className="fas fa-chevron-left mr-2"></i>
                        Request to book
                    </Link>
                </div>

                {/* <!-- Main Content Grid --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* <!-- Left Column --> */}
                    <PaymentForm />

                    {/* <!-- Right Column --> */}
                    <PropertyDetail />
                </div>
            </div>
            <Footer />
        </main>
    );
}

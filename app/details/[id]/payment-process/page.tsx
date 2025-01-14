import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/payment-process/BackButton";
import PaymentForm from "@/components/payment-process/PaymentForm";
import { getHotelById } from "@/db/queries";

export default async function PaymentProcessPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const hotelId = params?.id;
    const checkIn = searchParams.checkIn as string; // Access query parameters
    const checkOut = searchParams.checkOut as string;
    const totalGuests = searchParams.totalGuests as string;
    const hotelName = searchParams?.hotelName as string;

    const session = await auth();
    const userId = session?.user?.id || session?.user?._id;
    const userEmail = session?.user?.email;

    const hotelInfo = await getHotelById(hotelId);

    return (
        <main className="bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* <!-- Back Button --> */}
                <BackButton />

                {/* <!-- Main Content Grid --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* <!-- Left Column --> */}
                    <PaymentForm
                        userId={userId}
                        hotelId={hotelId}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        totalGuests={totalGuests}
                        hotelInfo={hotelInfo}
                        userEmail={userEmail}
                        hotelName={hotelName}
                    />
                </div>
            </div>
            <Footer />
        </main>
    );
}

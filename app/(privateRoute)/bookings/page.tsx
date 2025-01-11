import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { getAllBookingsByUser } from "@/db/queries";
import { formatDateWithMonth } from "@/lib/utils";
import Image from "next/image";
import DownloadReceipt from "./DownloadReceipt";

export default async function BookingsPage() {
    const session = await auth();
    const userId = session?.user?.id || session?.user?._id;

    const bookings = await getAllBookingsByUser(userId);

    console.log(bookings);

    return (
        <main className="bg-gray-50 text-gray-900 font-sans">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

                {bookings.length > 0 ? (
                    <div className="space-y-4">
                        {/* <!-- Booking Item 1 --> */}
                        {bookings.map((booking) => (
                            <div
                                key={booking?._id}
                                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center space-x-4">
                                    <Image
                                        width={96}
                                        height={96}
                                        src={booking?.hotelId?.thumbNailUrl}
                                        alt={booking?.hotelId?.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div>
                                        <h2 className="text-lg text-zinc-800 font-semibold">
                                            {booking?.hotelId?.name}
                                        </h2>
                                        <p className="text-zinc-500 text-sm">
                                            Booking Date: {formatDateWithMonth(booking?.bookingDate)}
                                        </p>
                                        <p className="text-zinc-500 text-sm">Booking Code: # {booking?._id}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    {/* <Link
                                        href={"#"}
                                        className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:brightness-90"
                                    >
                                        View Trip Details
                                    </Link> */}
                                    <DownloadReceipt bookingInfo={booking} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div id="empty-state" className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
                        <p className="text-zinc-500 text-sm">
                            You haven&apos;t made any bookings. Start exploring amazing stays!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

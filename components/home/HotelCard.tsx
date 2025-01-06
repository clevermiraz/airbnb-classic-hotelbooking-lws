import Image from "next/image";
import Link from "next/link";
import HotelRating from "./HotelRating";

export default function HotelCard({ hotelInfo }) {
    return (
        <Link href={`details/${hotelInfo?.id}`} className="block group">
            <div>
                <div className="relative">
                    <Image
                        width={406}
                        height={256}
                        src={hotelInfo?.thumbNailUrl}
                        alt={hotelInfo?.name}
                        className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
                        <i className="ph-bed inline-block mr-1"></i>
                        {hotelInfo?.availableRooms} Rooms Left
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{hotelInfo?.name}</h3>

                        <HotelRating hotelId={hotelInfo?.id} />
                    </div>
                    <p className="text-zinc-500 text-sm mt-1">{hotelInfo?.location}</p>
                    <div className="mt-2 flex justify-between items-center">
                        <div>
                            <span className="font-bold">${hotelInfo?.pricePerNight}</span>
                            <span className="text-zinc-500 text-sm ml-1">per night</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

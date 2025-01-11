"use client";

import Image from "next/image";

export default function PropertyDetail({ hotelInfo, duration }) {
    const pricePerNight = hotelInfo?.pricePerNight;
    const cleaningFee = "0.00";
    const serviceFee = "0.00";

    const totalBill = parseInt(pricePerNight) * parseInt(duration);

    return (
        <>
            <div>
                {/* <!-- Price Details Card --> */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
                    <div className="flex items-start gap-4 mb-6">
                        <Image
                            width={80}
                            height={80}
                            src={hotelInfo?.thumbNailUrl}
                            alt={hotelInfo?.name}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                            <p className="text-sm">{hotelInfo?.description}</p>
                            <div className="flex items-center">
                                <i className="fas fa-star text-sm mr-1"></i>
                                <span className="text-xs mt-1 text-zinc-500">5.00 (3 Reviews)</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-4">Price details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>
                                    ${pricePerNight} x {duration} nights
                                </span>
                                <span>${totalBill}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Cleaning fee</span>
                                <span>${cleaningFee}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service fee</span>
                                <span>${serviceFee}</span>
                            </div>
                            <div className="flex justify-between font-semibold pt-3 border-t">
                                <span>Total (USD)</span>
                                <span>${totalBill}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import Image from "next/image";

export default function Gallery({ hotelInfo }) {
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
            <div className="col-span-2 row-span-2">
                <Image
                    width={408}
                    height={500}
                    src={hotelInfo?.thumbNailUrl}
                    alt={hotelInfo?.name}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            {hotelInfo?.gallery.map((img, index) => (
                <div key={index}>
                    <Image
                        width={196}
                        height={242}
                        src={img}
                        alt={`Room ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            ))}
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMoveOutline } from "react-icons/io5";
import { MdBookOnline } from "react-icons/md";
import { PiDotOutline } from "react-icons/pi";

const Loading = () => {
    const icons = [
        <IoMoveOutline key="a" className="text-7xl text-yellow-500" />,
        <MdBookOnline key="b" className="text-7xl text-red-500" />,
        <PiDotOutline key="c" className="text-7xl text-green-500" />,
    ];

    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [icons.length]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
            <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    key={currentIconIndex}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0, rotate: -360 }}
                    transition={{ duration: 0.5 }}
                >
                    {icons[currentIconIndex]}
                </motion.div>
                <p className="text-xl font-medium animate-pulse">Loading, please wait...</p>
            </motion.div>
        </div>
    );
};

export default Loading;

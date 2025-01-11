"use client";

import Link from "next/link";
import { useState } from "react";

import Logout from "@/components/Logout";
import Image from "next/image";

export default function ClientToggleNavbar({ session, profileImage }) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="flex items-center space-x-4 relative justify-end">
            <button>
                <i className="fas fa-language text-zinc-700 text-xl"></i>
            </button>
            <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
            >
                <i className="fas fa-bars"></i>
                <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
                    {profileImage ? (
                        <Image width={60} height={60} src={profileImage} alt="profileImage" />
                    ) : (
                        <i className="fas fa-user text-white"></i>
                    )}
                </span>
            </button>
            <div className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 lg:block">
                <ul className={`${isNavOpen ? "block" : "hidden"}`}>
                    {session ? (
                        <>
                            <span>
                                <ul>
                                    <li className="cursor-pointer px-3 py-2 text-sm bg-teal-50 text-zinc-700 transition-all hover:bg-teal-100 hover:text-zinc-800 hover:pl-4">
                                        {session?.user?.name}
                                        <br />
                                        {session.user?.email}
                                    </li>
                                </ul>
                            </span>
                            <Link onClick={() => setIsNavOpen(!isNavOpen)} href="/create-hotel" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Create Hotel
                                </li>
                            </Link>

                            <Link onClick={() => setIsNavOpen(!isNavOpen)} href="/manage-hotels" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Manage Hotels
                                </li>
                            </Link>

                            <Link onClick={() => setIsNavOpen(!isNavOpen)} href="/bookings" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Bookings
                                </li>
                            </Link>

                            <Logout />
                        </>
                    ) : (
                        <>
                            <Link onClick={() => setIsNavOpen(!isNavOpen)} href="/login" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Login
                                </li>
                            </Link>

                            <Link onClick={() => setIsNavOpen(!isNavOpen)} href="/register" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Signup
                                </li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

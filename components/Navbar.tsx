import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/logo.svg";

export default function Navbar() {
    return (
        <>
            <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
                <div className="flex items-center">
                    <Link href="/">
                        <Image src={logo} alt="Hotel Logo" className="h-8 w-auto" />
                    </Link>
                </div>

                <div className="row-start-2 col-span-2 border-0 md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
                    <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow">
                        <input
                            type="text"
                            placeholder="Where to?"
                            className="px-3 bg-transparent focus:outline-none lg:col-span-3 placeholder:text-sm"
                        />
                    </div>

                    <button className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0">
                        <i className="fas fa-search text-white"></i>
                    </button>
                </div>

                <div className="flex items-center space-x-4 relative justify-end">
                    <button>
                        <i className="fas fa-language text-zinc-700 text-xl"></i>
                    </button>
                    <button className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center">
                        <i className="fas fa-bars"></i>
                        <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
                            <i className="fas fa-user text-white"></i>
                        </span>
                    </button>

                    {/* <!-- Popup --> */}
                    <div className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 hidden lg:block">
                        <ul className="">
                            <Link href="/login" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Login
                                </li>
                            </Link>

                            <Link href="/register" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Signup
                                </li>
                            </Link>

                            <Link href="/create-hotel" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Create Hotel
                                </li>
                            </Link>

                            <Link href="/manage-hotels" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Manage Hotels
                                </li>
                            </Link>

                            <Link href="/bookings" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Bookings
                                </li>
                            </Link>

                            <Link href="#" className="w-full">
                                <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                                    Logout
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import Logout from "@/components/Logout";
import logo from "@/public/assets/logo.svg";
import ClientToggleNavbar from "./ClientToggleNavbar";

export default async function Navbar() {
    const session = await auth();

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

                <ClientToggleNavbar>
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

                            <Logout />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </ClientToggleNavbar>
            </nav>
        </>
    );
}

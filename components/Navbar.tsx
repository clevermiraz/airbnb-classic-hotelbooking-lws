import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import logo from "@/public/assets/logo.svg";
import ClientToggleNavbar from "./ClientToggleNavbar";
import Search from "./Search";

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

                <Search />

                <ClientToggleNavbar session={session} />
            </nav>
        </>
    );
}

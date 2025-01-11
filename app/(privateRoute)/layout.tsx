import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function PrivateRouteLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const userId = session?.user?.id || session?.user?._id;

    if (!userId) {
        redirect("/login");
    }

    return <>{children}</>;
}

import ClientProvider from "@/components/ClientProvider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Airbnb Hotel",
    description: "Your next hotel booking destination",
};

// Define props type for RootLayout
interface RootLayoutProps {
    children: React.ReactNode;
    authModal: React.ReactNode; // Optional authModal prop
}

export default function RootLayout({ children, authModal }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ClientProvider>
                    {authModal}
                    {children}

                    <Toaster position="top-right" />
                </ClientProvider>
            </body>
        </html>
    );
}

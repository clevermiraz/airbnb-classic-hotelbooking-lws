// import logoSvg from "@/public/assets/logo.svg";
import { PDFDocument, rgb } from "pdf-lib";

export const generatePDF = async (bookingInfo) => {
    // Create a new PDF Document
    const pdfDoc = await PDFDocument.create();

    // Add a blank page
    const page = pdfDoc.addPage([600, 600]); // Increased height to fit more details

    // Set font sizes
    const fontSizeTitle = 20;
    const fontSizeText = 12;

    // Convert SVG to PNG in the browser (e.g., using a library or tool)
    // const svgToPng = async (svgPath) => {
    //     const svgElement = document.createElement("img");
    //     svgElement.src = svgPath;

    //     return new Promise((resolve, reject) => {
    //         svgElement.onload = () => {
    //             const canvas = document.createElement("canvas");
    //             const context = canvas.getContext("2d");

    //             canvas.width = svgElement.width;
    //             canvas.height = svgElement.height;

    //             context.drawImage(svgElement, 0, 0);
    //             canvas.toBlob(
    //                 (blob) => {
    //                     const reader = new FileReader();
    //                     reader.onload = () => resolve(reader.result);
    //                     reader.readAsArrayBuffer(blob);
    //                 },
    //                 "image/png",
    //                 1
    //             );
    //         };

    //         svgElement.onerror = () => reject(new Error("Failed to load SVG"));
    //     });
    // };

    // Convert the SVG logo to PNG
    // const logoBytes = await svgToPng(logoSvg);
    // const logoImage = await pdfDoc.embedPng(logoBytes);

    // // Scale and position the logo
    // const logoDims = logoImage.scale(0.2);
    // page.drawImage(logoImage, {
    //     x: 450,
    //     y: 350,
    //     width: logoDims.width,
    //     height: logoDims.height,
    // });

    // Title
    page.drawText("Booking Receipt", {
        x: 50,
        y: 450,
        size: fontSizeTitle,
        color: rgb(0, 0, 0.8), // Dark Blue
    });

    // Booking Information
    page.drawText(`Booking ID: ${bookingInfo._id || "N/A"}`, {
        x: 50,
        y: 420,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Hotel Name: ${bookingInfo.hotelId.name || "N/A"}`, {
        x: 50,
        y: 400,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Check-in Date: ${new Date(bookingInfo.checkIn).toLocaleString() || "N/A"}`, {
        x: 50,
        y: 380,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Check-out Date: ${new Date(bookingInfo.checkOut).toLocaleString() || "N/A"}`, {
        x: 50,
        y: 360,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Total Guests: ${bookingInfo.totalGuests || "N/A"}`, {
        x: 50,
        y: 340,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Total Amount: $${bookingInfo.totalBill || "N/A"}`, {
        x: 50,
        y: 320,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    // Customer Information
    page.drawText("Customer Information:", {
        x: 50,
        y: 300,
        size: fontSizeText,
        color: rgb(0, 0, 0.8), // Dark Blue
    });

    page.drawText(`Name: ${bookingInfo.userId.name || "N/A"}`, {
        x: 70,
        y: 280,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Email: ${bookingInfo.userId.email || "N/A"}`, {
        x: 70,
        y: 260,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    // Payment Details
    page.drawText("Payment Details:", {
        x: 50,
        y: 240,
        size: fontSizeText,
        color: rgb(0, 0, 0.8), // Dark Blue
    });

    page.drawText(`Card Number: **** **** **** ${bookingInfo.paymentDetails.cardNumber.slice(-4)}`, {
        x: 70,
        y: 220,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Expiration Date: ${bookingInfo.paymentDetails.expirationDate || "N/A"}`, {
        x: 70,
        y: 200,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    // Billing Address
    page.drawText("Billing Address:", {
        x: 50,
        y: 180,
        size: fontSizeText,
        color: rgb(0, 0, 0.8), // Dark Blue
    });

    page.drawText(`${bookingInfo.billingAddress.street || ""}, ${bookingInfo.billingAddress.apartment || ""}`, {
        x: 70,
        y: 160,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(
        `${bookingInfo.billingAddress.city || ""}, ${bookingInfo.billingAddress.state || ""}, ${
            bookingInfo.billingAddress.zipCode || ""
        }`,
        {
            x: 70,
            y: 140,
            size: fontSizeText,
            color: rgb(0, 0, 0),
        }
    );

    // Serialize the PDF document to bytes (Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Booking_Receipt_${bookingInfo._id || "unknown"}.pdf`;
    link.click();
};

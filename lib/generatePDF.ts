import { PDFDocument, rgb } from "pdf-lib";

export const generatePDF = async (bookingInfo) => {
    // Create a new PDF Document
    const pdfDoc = await PDFDocument.create();

    // Add a blank page
    const page = pdfDoc.addPage([600, 400]);

    // Set font sizes
    const fontSizeTitle = 20;
    const fontSizeText = 12;

    // Title
    page.drawText("Booking Receipt", {
        x: 50,
        y: 350,
        size: fontSizeTitle,
        color: rgb(0, 0, 0.8), // Dark Blue
    });

    // Booking Information
    page.drawText(`Booking ID: ${bookingInfo.id || "N/A"}`, {
        x: 50,
        y: 320,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Hotel Name: ${bookingInfo.hotelName || "N/A"}`, {
        x: 50,
        y: 300,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Check-in Date: ${bookingInfo.checkIn || "N/A"}`, {
        x: 50,
        y: 280,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Check-out Date: ${bookingInfo.checkOut || "N/A"}`, {
        x: 50,
        y: 260,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Total Amount: $${bookingInfo.amount || "N/A"}`, {
        x: 50,
        y: 240,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    // Add any additional details as needed
    page.drawText(`Customer Name: ${bookingInfo.customerName || "N/A"}`, {
        x: 50,
        y: 220,
        size: fontSizeText,
        color: rgb(0, 0, 0),
    });

    // Serialize the PDF document to bytes (Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Booking_Receipt_${bookingInfo.id || "unknown"}.pdf`;
    link.click();
};

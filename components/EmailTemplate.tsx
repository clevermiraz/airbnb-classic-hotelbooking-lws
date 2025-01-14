import React from "react";

interface EmailTemplateProps {
    emailData?: {
        hotelName?: string;
        checkIn?: string;
        checkOut?: string;
        totalGuests?: string;
        totalBill?: number;
        billingAddress?: {
            street?: string;
            apartment?: string;
            city?: string;
            state?: string;
            zipCode?: string;
        };
        paymentDetails?: {
            cardNumber?: string;
            expirationDate?: string;
        };
    };
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ emailData }) => (
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            color: "#333",
            lineHeight: "1.5",
            maxWidth: "600px",
            margin: "0 auto",
        }}
    >
        <h1 style={{ color: "#4CAF50" }}>Booking Confirmation</h1>
        <p>Thank you for choosing {emailData?.hotelName || "our service"}!</p>

        <h2 style={{ borderBottom: "1px solid #ddd", paddingBottom: "8px" }}>Booking Details</h2>
        <p>
            <strong>Hotel Name:</strong> {emailData?.hotelName || "N/A"}
        </p>
        <p>
            <strong>Check-in:</strong> {emailData?.checkIn ? new Date(emailData.checkIn).toLocaleString() : "N/A"}
        </p>
        <p>
            <strong>Check-out:</strong> {emailData?.checkOut ? new Date(emailData.checkOut).toLocaleString() : "N/A"}
        </p>
        <p>
            <strong>Total Guests:</strong> {emailData?.totalGuests || "N/A"}
        </p>

        <h2 style={{ borderBottom: "1px solid #ddd", paddingBottom: "8px" }}>Payment Summary</h2>
        <p>
            <strong>Total Bill:</strong> ${emailData?.totalBill?.toFixed(2) || "N/A"}
        </p>
        <p>
            <strong>Card Details:</strong> **** **** **** {emailData?.paymentDetails?.cardNumber?.slice(-4) || "N/A"}{" "}
            <br />
            <strong>Expiration:</strong> {emailData?.paymentDetails?.expirationDate || "N/A"}
        </p>

        <h2 style={{ borderBottom: "1px solid #ddd", paddingBottom: "8px" }}>Billing Address</h2>
        <p>
            {emailData?.billingAddress?.street || "N/A"}
            {emailData?.billingAddress?.apartment ? `, ${emailData.billingAddress.apartment}` : ""}
            {emailData?.billingAddress?.city ? `, ${emailData.billingAddress.city}` : ""}
            {emailData?.billingAddress?.state ? `, ${emailData.billingAddress.state}` : ""}
            {emailData?.billingAddress?.zipCode ? `, ${emailData.billingAddress.zipCode}` : ""}
        </p>

        <p style={{ marginTop: "20px" }}>
            If you have any questions, feel free to contact us at <a href="mailto:support@acme.com">support@acme.com</a>
            .
        </p>

        <footer style={{ marginTop: "30px", fontSize: "12px", color: "#888", textAlign: "center" }}>
            <p>Acme Corporation, 123 Main St, Springfield, IL 62701</p>
            <p>
                <a href="#" style={{ color: "#4CAF50" }}>
                    Unsubscribe
                </a>
            </p>
        </footer>
    </div>
);

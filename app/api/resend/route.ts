import { EmailTemplate } from "@/components/EmailTemplate";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    const { hotelName, userEmail, checkIn, checkOut, totalGuests, totalBill, paymentDetails, billingAddress } =
        await request.json();

    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [userEmail],
            subject: `Your Booking Details for ${hotelName}`,
            react: EmailTemplate({
                userEmail,
                hotelName,
                checkIn,
                checkOut,
                totalGuests,
                totalBill,
                paymentDetails,
                billingAddress,
            }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.log(error, "in catch");
        return Response.json({ error }, { status: 500 });
    }
}

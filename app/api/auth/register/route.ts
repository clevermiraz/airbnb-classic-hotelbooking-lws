import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import connectMongoDB from "@/db/mongodb";
import { userSchema } from "@/lib/validation";
import User from "@/models/Users";

export async function POST(request: NextRequest) {
    await connectMongoDB();

    try {
        const { fullName, email, password } = await request.json();

        if (!fullName || !email || !password) {
            return NextResponse.json({ message: "Authentication info is missing." }, { status: 400 });
        }

        // Validate plain-text password before hashing
        userSchema.parse({ fullName, email, password });

        const hashedPassword = await bcrypt.hash(password, 5);

        // Check if user already exists
        const isUserAlreadyInDB = await User.findOne({ email });
        if (isUserAlreadyInDB) {
            return NextResponse.json({ message: `An account with email -> ${email} already exists.` }, { status: 200 });
        }

        // Create user
        await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: `User ${fullName} has been created.` }, { status: 201 });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json({ message: "Validation error.", details: error.errors }, { status: 422 });
        }
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

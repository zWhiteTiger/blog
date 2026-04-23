import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

const SALT_ROUNDS = 12;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, firstName, lastName } = body;

        if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
            return NextResponse.json(
                { success: false, error: "Valid email is required" },
                { status: 400 }
            );
        }

        if (!password || typeof password !== "string" || password.length < 8) {
            return NextResponse.json(
                { success: false, error: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        await connectDB();

        const existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser) {
            return NextResponse.json({ message: "Email or username already exists" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({
            email,
            firstName,
            lastName,
            passwordHash,
            provider: "credentials",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                data: {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    provider: user.provider,
                    createdAt: user.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (err: unknown) {
        if ((err as { code?: number }).code === 11000) {
            return NextResponse.json(
                { success: false, error: "Email already registered" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
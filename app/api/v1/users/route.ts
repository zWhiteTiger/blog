import { connectDB } from "@/lib/mongoose"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectDB()

        const users = await User.find(
            {},
            {
                _id: 1,
                firstName: 1,
                lastName: 1
            }
        )

        return NextResponse.json(users)

    } catch (err) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        )
    }
}
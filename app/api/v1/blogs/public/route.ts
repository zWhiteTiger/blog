import { connectDB } from "@/lib/mongoose"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    await connectDB()

    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get("page") || "1")
    const limit = 10
    const skip = (page - 1) * limit

    const search = searchParams.get("search") || ""

    const query = {
        isPublic: true,
        ...(search && {
            title: { $regex: search, $options: "i" }
        })
    }

    const [blogs, total] = await Promise.all([
        Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Blog.countDocuments(query)
    ])

    return NextResponse.json({
        data: blogs,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    })
}
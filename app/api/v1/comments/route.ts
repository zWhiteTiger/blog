import { connectDB } from "@/lib/mongoose"
import Comment from "@/models/Comment"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    await connectDB()

    const body = await req.json()

    const comment = await Comment.create({
        blogSlug: body.blogSlug,
        name: body.name,
        message: body.message,
        status: "pending"
    })

    return NextResponse.json(comment)
}

export async function GET(req: Request) {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    if (!slug) {
        return NextResponse.json(
            { message: "slug required" },
            { status: 400 }
        )
    }

    const comments = await Comment.find({
        blogSlug: slug,
        status: "approved"
    }).sort({ createdAt: -1 })

    return NextResponse.json(comments)
}
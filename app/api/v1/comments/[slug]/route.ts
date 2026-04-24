import { connectDB } from "@/lib/mongoose"
import Comment from "@/models/Comment"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    await connectDB()

    const { slug } = await context.params

    const body = await req.json()

    const updated = await Comment.findByIdAndUpdate(
        slug,
        { status: body.status },
        { new: true }
    )

    return NextResponse.json(updated)
}

export async function DELETE(
    _: Request,
    context: { params: Promise<{ slug: string }> }
) {
    await connectDB()

    const { slug } = await context.params

    await Comment.findByIdAndDelete(slug)

    return NextResponse.json({ success: true })
}
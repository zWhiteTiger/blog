import { connectDB } from "@/lib/mongoose"
import Comment from "@/models/Comment"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB()

    const body = await req.json()

    const allowed = ["pending", "approved", "rejected"]

    if (!allowed.includes(body.status)) {
        return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    const updated = await Comment.findByIdAndUpdate(
        (await params).id,
        { status: body.status },
        { new: true }
    )

    return NextResponse.json(updated)
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB()

    await Comment.findByIdAndDelete((await params).id)

    return NextResponse.json({ success: true })
}
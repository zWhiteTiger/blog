import { connectDB } from "@/lib/mongoose"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"
import { generateSlug, generateUniqueSlug } from "@/lib/slug"

export async function GET(
    _: Request,
    context: { params: Promise<{ slug: string }> }
) {
    await connectDB()

    const { slug } = await context.params

    const blog = await Blog.findOne({ slug })

    if (!blog) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
        )
    }

    return NextResponse.json(blog)
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    await connectDB()

    const { slug } = await context.params

    const body = await req.json()

    let updateData: any = { ...body }

    if (body.title) {
        const baseSlug = generateSlug(body.title)
        updateData.slug = await generateUniqueSlug(baseSlug)
    }

    const blog = await Blog.findOneAndUpdate(
        { slug: slug },
        updateData,
        { new: true }
    )

    return NextResponse.json({
        ...blog?.toObject(),
        newSlug: updateData.slug ?? slug
    })
}

export async function DELETE(
    _: Request,
    context: { params: Promise<{ slug: string }> }
) {
    await connectDB()

    const { slug } = await context.params

    await Blog.findOneAndDelete({ slug: slug })

    return NextResponse.json({ success: true })
}
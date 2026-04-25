import { connectDB } from "@/lib/mongoose"
import { generateSlug, generateUniqueSlug } from "@/lib/slug"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        await connectDB()

        const body = await req.json()

        if (!body.title || !body.owner) {
            return NextResponse.json(
                { error: "Missing title or owner" },
                { status: 400 }
            )
        }

        const baseSlug = generateSlug(body.title)
        const slug = await generateUniqueSlug(baseSlug)

        const blog = await Blog.create({
            ...body,
            slug
        })

        return NextResponse.json(blog)

    } catch (error: any) {

        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Slug already exists" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(req: Request) {
    await connectDB()

    const { searchParams } = new URL(req.url)

    const owner = searchParams.get("owner")
    const search = searchParams.get("search")

    let query: any = {}

    if (owner) {
        query.owner = owner
    }

    if (search) {
        query.title = {
            $regex: search,
            $options: "i"
        }
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 })

    return NextResponse.json(blogs)
}
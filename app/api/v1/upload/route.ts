import { NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { r2 } from "@/lib/r2"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
        return NextResponse.json({ error: "No file" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const fileName = `${randomUUID()}-${file.name}`

    await r2.send(
        new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: fileName,
            Body: buffer,
            ContentType: file.type
        })
    )

    const url = `${process.env.R2_PUBLIC_URL}/${fileName}`

    return NextResponse.json({ url })
}
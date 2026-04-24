"use client"

import { Block } from "@/app/manage/blog/[slug]/page"
import Image from "next/image"

export default function BlockRenderer({
    block,
    onChange
}: {
    block: Block
    onChange?: (data: any) => void
}) {

    if (block.type === "text") {
        return (
            <div className="border p-3 min-h-[80px]">
                <textarea
                    value={block.content?.text || ""}

                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}

                    onChange={(e) =>
                        onChange?.({
                            content: {
                                ...(block.content || {}),
                                text: e.target.value
                            }
                        })
                    }

                    className="w-full h-full outline-none resize-none bg-transparent"
                />
            </div>
        )
    }


    if (block.type === "image") {

        const images = block.content?.images || []

        async function uploadImage(file: File) {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/v1/upload", {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            return data.url as string
        }


        async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
            const files = Array.from(e.target.files || [])

            const remaining = 5 - images.length
            const selected = files.slice(0, remaining)

            // 🔥 upload จริงไป R2
            const uploadedUrls: string[] = []

            for (const file of selected) {
                const url = await uploadImage(file)
                uploadedUrls.push(url)
            }

            onChange?.({
                content: {
                    ...(block.content || {}),
                    images: [...images, ...uploadedUrls]
                }
            })
        }
        return (
            <div className="border p-3 space-y-2">

                <div className="grid grid-cols-3 gap-2">
                    {images.map((src, i) => (
                        <div key={i} className="relative w-full">

                            <Image
                                src={src}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-auto object-contain"
                            />

                            <button
                                onClick={() => {
                                    const newImages = images.filter((_, idx) => idx !== i)
                                    onChange?.({
                                        content: {
                                            images: newImages
                                        }
                                    })
                                }}
                                className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1"
                            >
                                ×
                            </button>

                        </div>
                    ))}
                </div>

                {images.length < 5 && (
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleUpload}
                    />
                )}

                <p className="text-xs text-muted-foreground">
                    {images.length}/5 images
                </p>
            </div>
        )
    }

    return null
}
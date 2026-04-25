"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
    value?: string
    onChange?: (url: string) => void
    slug: string
}

export default function BlogCover({ value, onChange, slug }: Props) {

    const [loading, setLoading] = useState(false)

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
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)

        try {
            const url = await uploadImage(file)
            onChange?.(url)

            await saveCover(url)
        } catch (err) {
            console.error("Upload failed", err)
            alert("Upload failed")
        } finally {
            setLoading(false)
        }
    }


    async function saveCover(imageUrl: string) {
        await fetch(`/api/v1/blogs/${slug}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: imageUrl
            })
        })
    }

    return (
        <div className="w-full space-y-2">

            <div className="w-full h-20 border overflow-hidden bg-muted flex items-center justify-center">

                {value && value.trim() !== "" ? (
                    <Image
                        src={value}
                        alt="cover"
                        width={0}
                        height={0}
                        sizes="100vh"
                        className="object-cover w-auto h-auto"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        No cover image
                    </div>
                )}

            </div>
            <label className="cursor-pointer text-xs text-muted-foreground hover:text-white">
                {loading ? "Uploading..." : "Upload cover"}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={loading}
                    onClick={(e) => {
                        (e.target as HTMLInputElement).value = ""
                    }}
                />
            </label>

            {loading && (
                <p className="text-xs text-muted-foreground">
                    Uploading...
                </p>
            )}

        </div>
    )
}
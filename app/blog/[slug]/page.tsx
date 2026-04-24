"use client"

import React, { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useSession } from "next-auth/react"

type Block = {
    id: string
    type: "text" | "image"
    colSpan: number
    col: number
    row: number
    content?: {
        text?: string
        images?: string[]
    }
}

type Comment = {
    _id: string
    name: string
    message: string
    createdAt: string
}

export default function BlogPage() {

    const params = useParams()
    const slug = params.slug as string

    const [blocks, setBlocks] = useState<Block[]>([])
    const [notFound, setNotFound] = useState(false)
    const gridRef = useRef<HTMLDivElement>(null)

    const { data: session } = useSession()

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await fetch(`/api/v1/blogs/${slug}`)

                if (res.status === 404) {
                    setNotFound(true)
                    return
                }

                const data = await res.json()

                setBlocks(
                    data.elements.map((el: any) => ({
                        id: el.id,
                        type: el.type,
                        col: el.col,
                        row: el.row,
                        colSpan: el.colSpan,
                        content: el.content
                    }))
                )

            } catch (err) {
                setNotFound(true)
            }
        }

        fetchBlog()
    }, [slug])

    const [comments, setComments] = useState<Comment[]>([])
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    const fullName =
        `${session?.user?.firstName ?? ""} ${session?.user?.lastName ?? ""}`.trim()

    useEffect(() => {
        async function fetchComments() {
            const res = await fetch(`/api/v1/comments?slug=${slug}`)
            const data = await res.json()
            setComments(data)
        }

        fetchComments()
    }, [slug])

    async function submitComment() {
        if (!message) return

        const payload = {
            blogSlug: slug,
            name: fullName,
            message: message
        }

        const res = await fetch("/api/v1/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            console.error("failed to post comment")
            return
        }

        setMessage("")
    }


    return (
        <div className="w-full min-h-screen flex flex-col justify-center">

            <div className="w-[1200px] shadow-md">

                <div
                    ref={gridRef}
                    className="grid grid-cols-8"
                >
                    {blocks.map((block) => (
                        <div
                            key={block.id}
                            style={{
                                gridColumn: `${block.col + 1} / span ${block.colSpan}`
                            }}
                            className="p-3"
                        >

                            {block.type === "text" && (
                                <p className="whitespace-pre-wrap text-sm">
                                    {block.content?.text}
                                </p>
                            )}

                            {block.type === "image" && (
                                <div className="grid grid-cols-2">
                                    {block.content?.images?.map((src, i) => (
                                        <Image
                                            key={i}
                                            src={src}
                                            alt=""
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto object-contain"
                                        />
                                    ))}
                                </div>
                            )}

                        </div>
                    ))}
                </div>

            </div>

            <div className="mt-10 border-t pt-5">

                {/* FORM */}
                <div className="space-y-2 mb-6">

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="comment..."
                        className="border p-2 w-full"
                    />

                    <button
                        onClick={submitComment}
                        className="bg-black text-white px-4 py-2"
                    >
                        ส่งคอมเมนต์
                    </button>
                </div>

                <div className="space-y-3">
                    {comments.map(c => (
                        <div key={c._id} className="border p-3">
                            <div className="text-xs text-current/50">
                                {c.name}
                            </div>
                            <div className="text-sm">{c.message}</div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}
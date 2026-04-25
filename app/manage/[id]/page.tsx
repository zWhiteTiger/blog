"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { RiFileImageLine, RiMore2Fill } from "@remixicon/react"
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { useSession } from "next-auth/react"

type Blog = {
    _id: string
    title: string
    description?: string
    image?: string
    slug: string
    owner: string
    isPublic?: boolean
    createdAt?: string
}

export default function ManagePage() {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const [creating, setCreating] = useState(false)

    const [title, setTitle] = useState("")

    const { data: session } = useSession()
    const userId = session?.user?.id

    useEffect(() => {
        async function fetchBlogs() {
            if (!userId) return

            try {
                setLoading(true)

                const res = await fetch(
                    `/api/v1/blogs?owner=${userId}&search=${search}`
                )

                const data: Blog[] = await res.json()
                setBlogs(data)

            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [search, userId])

    useEffect(() => {
        const t = setTimeout(() => {
        }, 300)

        return () => clearTimeout(t)
    }, [search])

    async function createBlog() {
        try {
            setCreating(true)

            const res = await fetch("/api/v1/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    owner: userId,
                    image: "",
                    isPublic: false
                })
            })

            const data = await res.json()

            setOpen(false)
            setTitle("")

            window.location.href = `/manage/blog/${data.slug}`

        } finally {
            setCreating(false)
        }
    }

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-4">

            <div className="flex justify-between items-center gap-3">

                <Input
                    placeholder="Search your blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md"
                />

                <Button onClick={() => setOpen(true)}>
                    Create new
                </Button>

            </div>

            {loading && (
                <p className="text-muted-foreground text-sm">
                    Loading...
                </p>
            )}

            {!loading && blogs.length === 0 && search === "" && (
                <p className="text-muted-foreground text-sm">
                    No blogs found
                </p>
            )}

            <div className="space-y-4">

                {blogs.map((blog) => (
                    <Card
                        key={blog._id}
                    >

                        <CardContent

                            className="flex flex-row w-full gap-4 items-center"

                        >
                            {blog.image?.trim() ? (
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    height={0}
                                    width={0}
                                    sizes="100vh"
                                    className="object-cover w-20 h-20 border"
                                />
                            ) : (
                                <div className="w-20 h-20 border flex items-center justify-center text-xs text-muted-foreground">
                                    <RiFileImageLine />
                                </div>
                            )}

                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-col">
                                    <h2 className="font-semibold text-lg">
                                        {blog.title}
                                    </h2>

                                    <p className="text-xs text-muted-foreground">
                                        /{blog.slug}
                                    </p>
                                </div>

                                <div className="flex flex-col">
                                    Create at
                                    <p className="text-xs text-muted-foreground">
                                        {blog.createdAt
                                            ? new Date(blog.createdAt).toLocaleString()
                                            : "No date"}
                                    </p>
                                </div>

                                <p className="text-xs flex flex-col">
                                    Status:{" "}
                                    <span className={blog.isPublic ? "text-green-500" : "text-yellow-500"}>
                                        {blog.isPublic ? "Public" : "Unpublic"}
                                    </span>
                                </p>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <RiMore2Fill size={18} />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">

                                        <DropdownMenuItem asChild>
                                            <Link href={`/manage/blog/${blog.slug}`}>
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href={`/blog/${blog.slug}`}>
                                                View
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href={`/manage/comments/${blog.slug}`}>
                                                Manage Comments
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={async () => {
                                                await fetch(`/api/v1/blogs/${blog.slug}`, {
                                                    method: "DELETE"
                                                })

                                                setBlogs(prev =>
                                                    prev.filter(b => b._id !== blog._id)
                                                )
                                            }}
                                        >
                                            Delete
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>

                        </CardContent>

                    </Card>
                ))}

            </div>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new blog</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={createBlog}
                            disabled={creating || !title}
                        >
                            {creating ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}
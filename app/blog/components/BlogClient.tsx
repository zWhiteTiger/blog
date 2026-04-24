"use client"

import FeaturedContent from "@/app/home/components/featuredContent"
import SearchBar from "@/components/element/searchButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import Image from "next/image"
import Link from "next/link"

export default function BlogClient() {

    const searchParams = useSearchParams()
    const keyword = searchParams.get("search") || ""

    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        async function fetchBlogs() {
            const res = await fetch(
                `/api/v1/blogs/public?page=${page}&search=${keyword}`
            )
            const data = await res.json()

            setBlogs(data.data)
            setTotalPages(data.totalPages)
        }

        fetchBlogs()
    }, [page, keyword])


    return (
        <div className="flex flex-col gap-6 px-4 py-5">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                <div className="lg:col-span-2 space-y-2">
                    <Button variant="link" className="p-0">Hello</Button>

                    <p className="text-3xl md:text-5xl font-bold">
                        Explore our blog.
                    </p>

                    <p className="text-sm md:text-md text-muted-foreground max-w-xl">
                        Discover insights, tutorials, and stories from developers and creators around the world.
                    </p>
                </div>

                <div className="flex lg:justify-end items-end">
                    <div className="w-full max-w-md">
                        <SearchBar blogs={[]} />

                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {blogs.map((blog: any) => {

                        const cover = blog.image

                        return (
                            <Card key={blog._id} className="overflow-hidden hover:shadow-md transition p-0 max-w-xs">

                                {cover ? (
                                    <div className="relative h-44 w-full">
                                        <Image
                                            src={cover}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-44 w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                                        No cover image
                                    </div>
                                )}

                                <CardContent className="p-4 space-y-2">
                                    <h2 className="font-bold text-lg line-clamp-2">
                                        {blog.title}
                                    </h2>

                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {blog.owner}
                                    </p>
                                </CardContent>

                                <CardFooter className="w-full">
                                    <div className="w-full">
                                        <Link href={`/blog/${blog.slug}`}>
                                        <Button className="w-full">
                                            Open
                                        </Button>
                                    </Link>
                                    </div>

                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>

                <div className="flex justify-center pt-6">
                    <Pagination>
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={page === i + 1}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setPage(p => Math.min(totalPages, p + 1))
                                    }
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                </div>

            </div>

        </div>
    )
}
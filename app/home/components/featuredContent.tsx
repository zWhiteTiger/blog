"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Item = {
    id: number
    title: string
    description: string
    image: string
    author: string
    views: number
}

const data: Item[] = [
    {
        id: 1,
        title: "Building Modern UI with Next.js",
        description: "Learn how to build scalable UI with best practices.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        author: "John Dev",
        views: 12400,
    },
    {
        id: 2,
        title: "React Performance Tips",
        description: "Optimize rendering and improve UX.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        author: "Jane Smith",
        views: 9800,
    },
    {
        id: 3,
        title: "UI Design System Guide",
        description: "How to build scalable design systems.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        author: "Mike Lee",
        views: 21000,
    },
    {
        id: 4,
        title: "Backend API Best Practices",
        description: "Clean architecture for APIs.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
        author: "Sarah Kim",
        views: 5400,
    },
]

export default function FeaturedContent() {
    // 🔥 sort by views (มาก → น้อย)
    const sortedData = [...data].sort((a, b) => b.views - a.views)

    return (
        <div className="w-full">
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedData.map((item) => (
                    <Card key={item.id} className="overflow-hidden py-0 flex justify-between">

                        {/* Image */}
                        <div className="relative w-full h-40">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <CardHeader className="space-y-2">
                            <h2 className="text-base font-bold line-clamp-1">
                                {item.title}
                            </h2>

                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.description}
                            </p>
                        </CardHeader>

                        <CardContent className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src="https://i.pravatar.cc/100" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>

                                <span className="text-sm">{item.author}</span>
                            </div>

                            <span className="text-xs text-muted-foreground">
                                {(item.views / 1000).toFixed(1)}k views
                            </span>
                        </CardContent>

                        <CardFooter>
                            <Button className="w-full">Read Article</Button>
                        </CardFooter>

                    </Card>
                ))}
            </div>
        </div>
    )
}
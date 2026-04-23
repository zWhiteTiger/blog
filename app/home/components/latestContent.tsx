"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const mockData = [
    {
        id: 1,
        title: "Introducing Modern UI Design",
        description:
            "Learn how to design modern interfaces with clean structure and reusable components.",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        date: "2026-04-23",
        time: "14:30",
    },
    {
        id: 2,
        title: "Next.js Performance Tips",
        description:
            "Improve your Next.js application performance with these practical techniques.",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        date: "2026-04-22",
        time: "09:10",
    },
]

export default function LatestContent() {
    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
            {mockData.map((item) => (
                <Card key={item.id} className="overflow-hidden py-0">
                    <CardContent className="p-0 flex">

                        {/* Image Left */}
                        <div className="relative w-32 h-28 md:w-40 md:h-32 shrink-0">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content Right */}
                        <div className="flex flex-col justify-between p-3 w-full">

                            {/* Date + Time */}
                            <div className="text-xs text-muted-foreground">
                                {item.date} • {item.time}
                            </div>

                            {/* Title */}
                            <h3 className="text-sm md:text-base font-semibold line-clamp-1">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {item.description}
                            </p>

                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
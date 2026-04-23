"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { RiArrowRightSLine, RiSearch2Line } from "@remixicon/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type Blog = {
    title: string
    slug: string
}

type Props = {
    blogs: Blog[]
}

export default function SearchBar({ blogs }: Props) {
    const [value, setValue] = useState("")
    const router = useRouter()

    const filtered = useMemo(() => {
        if (!value) return []

        return blogs
            .filter((b) =>
                b.title.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 5)
    }, [value, blogs])

    const handleSearch = () => {
        const exact = blogs.find(
            (b) => b.title.toLowerCase() === value.toLowerCase()
        )

        if (exact) {
            router.push(`/blog/${exact.slug}`)
        } else {
            router.push(`/blog?search=${encodeURIComponent(value)}`)
        }
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-md flex flex-col gap-2 relative">

                <div className="flex flex-row gap-2 items-center" suppressHydrationWarning>
                    <RiSearch2Line />

                    <Input
                        placeholder="Search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch()
                        }}
                    />

                    <Button onClick={handleSearch}>
                        Enter <RiArrowRightSLine />
                    </Button>
                </div>

                {/* dropdown */}
                {filtered.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-background border shadow z-50">
                        {filtered.map((item) => (
                            <div
                                key={item.slug}
                                className="p-2 cursor-pointer"
                                onClick={() => router.push(`/blog/${item.slug}`)}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
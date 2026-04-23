"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

            {/* Big 404 */}
            <h1 className="text-6xl md:text-8xl font-bold">
                404
            </h1>

            {/* Title */}
            <h2 className="mt-4 text-xl md:text-2xl font-semibold">
                Page Not Found
            </h2>

            {/* Description */}
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
                The page you are looking for doesn’t exist or has been moved.
            </p>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
            </div>

        </div>
    )
}
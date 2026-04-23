"use client"

import SearchBar from "@/components/element/searchButton"
import { Button } from "@/components/ui/button"
import FeaturedContent from "../home/components/featuredContent"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"

export default function BlogPage() {

  const searchParams = useSearchParams()
  const keyword = searchParams.get("search") || ""

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="lg:col-span-2">
          <ScrollArea className="h-170 w-full pr-2">
            <FeaturedContent />
          </ScrollArea>
        </div>

        <div className="hidden md:flex flex-col gap-4">

          <Card className="w-full">
            <CardContent className="p-4">
              <p className="font-medium">Trending</p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="p-4">
              <p>Latest tags</p>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  )
}
"use client";

import { Badge } from "@/components/ui/badge";
import { DropMenu } from "./utils/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypographyPanel from "./utils/typo";
import BlogCover from "./utils/blogcover";
import { useEffect, useState } from "react";

type Props = {
    slug: string
    setIsDirty: (v: boolean) => void
}

export default function Sidebar({ slug, setIsDirty }: Props) {

    const [coverImage, setCoverImage] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`/api/v1/blogs/${slug}`)
            const data = await res.json()

            setCoverImage(data.image || "")
            setTitle(data.title || "")
        }

        fetchBlog()
    }, [slug])

    return (
        <div className="p-5 flex flex-col gap-5 
                        bg-white/60 dark:bg-black/40 
                        backdrop-blur-md border max-w-xs w-full"
        >

            <div className='flex flex-row justify-between items-center'>
                <DropMenu />
            </div>

            <div className='flex flex-col gap-2'>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project name"
                />
            </div>


            <Tabs defaultValue="typo" className="overflow-hidden max-w-xs w-full">
                <TabsList variant="line">
                    <TabsTrigger value="typo">Typography</TabsTrigger>
                    <TabsTrigger value="layout">Cover Image</TabsTrigger>
                </TabsList>
                <TabsContent value="typo" className="py-2">

                    <TypographyPanel />

                </TabsContent>
                <TabsContent value="layout">

                    <BlogCover
                        value={coverImage}
                        onChange={async (url) => {
                            setCoverImage(url);
                            setIsDirty(true);

                            await fetch(`/api/v1/blogs/${slug}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    Image: url
                                })
                            });
                        }} slug={slug}
                    />

                </TabsContent>
            </Tabs>
        </div>
    )
}
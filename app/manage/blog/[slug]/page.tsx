"use client"

import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './components/sidebar'
import { UserCenter } from '@/components/appbar/usercenter'
import { Button } from '@/components/ui/button'
import FloatingToolbar from './components/utils/floatingbar'

import {
    DndContext,
    closestCenter,
    DragEndEvent
} from "@dnd-kit/core"

import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"

import SortableBlock from './components/editor/sortable-block'

import { useParams } from "next/navigation"
import NotFoundModal from '@/components/element/not-found-modal'

import { useRouter } from "next/navigation"

type Tool = "cursor" | "move" | "text" | "image"

export type Block = {
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

export default function ManageBlog() {

    const router = useRouter()

    const params = useParams()
    const slug = params.slug as string

    const [currentSlug, setCurrentSlug] = useState(slug)

    const [tool, setTool] = useState<Tool>("cursor")
    const [blocks, setBlocks] = useState<Block[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const [isPublic, setIsPublic] = useState(false)
    const [autoSave, setAutoSave] = useState(false)
    const [saving, setSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [isDirty, setIsDirty] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const gridRef = useRef<HTMLDivElement>(null)

    const imageCount = blocks.filter(b => b.type === "image").length

    useEffect(() => {
        if (!currentSlug) return
        if (currentSlug === slug) return

        router.replace(`/manage/blogs/${currentSlug}`)
    }, [currentSlug, slug, router])

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

                setIsPublic(data.isPublic)

                // ✅ ใส่ตรงนี้
                setCurrentSlug(data.slug)

            } catch (err) {
                setNotFound(true)
            }
        }

        fetchBlog()
    }, [slug])

    function buildPayload() {
        return {
            slug: "my-blog",
            owner: "user-id",
            status: "draft",
            isPublic,

            elements: blocks.map(b => ({
                id: b.id,
                type: b.type,
                col: b.col,
                row: b.row,
                colSpan: b.colSpan,

                content: {
                    text: b.content?.text || "",
                    images: b.content?.images || []
                }
            }))
        }
    }

    async function saveBlog() {
        try {
            setSaving(true)

            const payload = {
                ...buildPayload(),
                slug: currentSlug
            }

            await fetch(`/api/v1/blogs/${currentSlug}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            setLastSaved(new Date())
            setIsDirty(false)
        } finally {
            setSaving(false)
        }
    }

    useEffect(() => {
        if (!autoSave || !isDirty) return

        const timeout = setTimeout(() => {
            saveBlog()
        }, 5000)

        return () => clearTimeout(timeout)
    }, [blocks, autoSave, isDirty])

    function addBlock(type: "text" | "image") {
        if (type === "image" && imageCount >= 6) {
            alert("You can only add up to 6 image blocks")
            return
        }

        setBlocks(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                type,
                colSpan: type === "text" ? 8 : 4,   // 🔥 FIX ตรงนี้
                col: 0,
                row: 0,
                content: {
                    text: "",
                    images: []
                }
            }
        ])
    }

    function getColFromPointer(clientX: number, colSpan: number) {
        const rect = gridRef.current!.getBoundingClientRect()
        const x = clientX - rect.left
        const colWidth = rect.width / 8

        let col = Math.floor(x / colWidth)

        col = Math.max(0, Math.min(7, col))

        if (col + colSpan > 8) {
            col = 8 - colSpan
        }

        return col
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, delta } = event

        const block = blocks.find(b => b.id === active.id)
        if (!block || !gridRef.current) return

        const rect = gridRef.current.getBoundingClientRect()

        const clientX = rect.left + delta.x + rect.width / 2

        const newCol = Math.max(0, Math.min(8 - block.colSpan, getColFromPointer(clientX, block.colSpan)))

        setBlocks(prev =>
            prev.map(b =>
                b.id === block.id
                    ? { ...b, col: newCol }
                    : b
            )
        )
    }

    function resizeBlock(id: string, newSpan: number) {
        setBlocks(prev =>
            prev.map(b => {
                if (b.id !== id) return b

                const maxSpan = b.type === "text" ? 8 : 4
                const colSpan = Math.min(maxSpan, Math.max(1, newSpan))

                const col = Math.min(b.col, 8 - colSpan)

                return {
                    ...b,
                    col,
                    colSpan
                }
            })
        )
    }

    return (
        <div className="h-screen w-full overflow-hidden flex p-5">

            <aside className="w-1/6 max-w-sm w-full sticky top-0 p-4">
                <Sidebar
                    slug={slug}
                    setIsDirty={setIsDirty}
                />
            </aside>

            <main className="w-5/6 h-full flex flex-col">

                <div className="flex justify-end items-center p-2">
                    <div className="flex gap-2">
                        <div className="flex gap-2 items-center">

                            {/* SAVE */}
                            <Button
                                onClick={saveBlog}
                                disabled={saving}
                                variant="default"
                            >
                                {saving ? "Saving..." : "Save"}
                            </Button>

                            {/* PUBLIC */}
                            <Button
                                variant={isPublic ? "default" : "outline"}
                                onClick={() => {
                                    setIsPublic(prev => !prev)
                                    setIsDirty(true)
                                }}
                            >
                                {isPublic ? "Public" : "Private"}
                            </Button>

                            {/* AUTO SAVE */}
                            <Button
                                variant={autoSave ? "default" : "outline"}
                                onClick={() => setAutoSave(prev => !prev)}
                            >
                                Auto Save
                            </Button>

                            {/* STATUS */}
                            <span className="text-xs text-muted-foreground">
                                {lastSaved
                                    ? `Saved at ${lastSaved.toLocaleTimeString()}`
                                    : "Not saved"}
                            </span>

                        </div>
                        <UserCenter />
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <div className="w-[1200px] h-[85vh] bg-background border shadow-md overflow-y-auto overflow-x-hidden p-5">

                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >

                            <SortableContext
                                items={blocks.map(b => b.id)}
                                strategy={verticalListSortingStrategy}
                            >

                                <div className='relative'>
                                    <div
                                        ref={gridRef}
                                        className="grid grid-cols-8 gap-3"
                                    >
                                        {blocks.map((block) => (
                                            <div
                                                key={block.id}
                                                style={{
                                                    gridColumn: `${block.col + 1} / span ${block.colSpan}`
                                                }}
                                                className="relative z-10"
                                            >
                                                <SortableBlock
                                                    block={block}
                                                    selected={selectedId === block.id}
                                                    onSelect={() => setSelectedId(block.id)}
                                                    onDelete={() => {
                                                        setBlocks(prev => prev.filter(b => b.id !== block.id))
                                                        setSelectedId(null)
                                                    }}
                                                    onResize={(span) => resizeBlock(block.id, span)}
                                                    activeTool={tool}
                                                    gridRef={gridRef}
                                                    onChange={(data: Partial<Block>) => {
                                                        setBlocks(prev =>
                                                            prev.map(b =>
                                                                b.id === block.id
                                                                    ? {
                                                                        ...b,
                                                                        ...data,
                                                                        content: {
                                                                            ...(b.content || {}),
                                                                            ...(data.content || {})
                                                                        }
                                                                    }
                                                                    : b
                                                            )
                                                        )
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="absolute inset-0 grid grid-cols-8 gap-3 pointer-events-none z-0">
                                        {Array.from({ length: 8 }).map((_, col) => (
                                            <div key={col} className="relative border-r last:border-r-0"></div>
                                        ))}
                                    </div>

                                </div>

                            </SortableContext>
                        </DndContext>

                    </div>
                </div>

                <FloatingToolbar
                    activeTool={tool}
                    onChange={(t) => {
                        setTool(t)
                        if (t === "text" || t === "image") addBlock(t)
                    }}
                    disabled={imageCount >= 5}
                />

            </main>

            <NotFoundModal open={notFound} />
        </div>
    )
}
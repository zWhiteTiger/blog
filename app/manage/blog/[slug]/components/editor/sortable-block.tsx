"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import BlockRenderer from "./block-renderer"
import { Block } from "@/app/manage/blog/[slug]/page"
import { RiDeleteBinLine, RiDraggable } from "@remixicon/react"

type Props = {
    block: Block
    selected: boolean
    onSelect: () => void
    onDelete: () => void
    onResize: (span: number) => void
    activeTool: "cursor" | "move" | "text" | "image"
    gridRef: React.RefObject<HTMLDivElement | null>
    onChange?: (data: Partial<Block>) => void
}

export default function SortableBlock({
    block,
    selected,
    onSelect,
    onDelete,
    onResize,
    activeTool,
    gridRef,
    onChange
}: Props) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: block.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    function handleResizeStart(e: React.MouseEvent) {
        e.stopPropagation()

        const startX = e.clientX
        const startSpan = block.colSpan

        const rect = gridRef.current?.getBoundingClientRect()
        if (!rect) return

        const colWidth = rect.width / 8

        const maxSpan = block.type === "text" ? 8 : 4   // 🔥 IMPORTANT

        function onMove(ev: MouseEvent) {
            const deltaX = ev.clientX - startX

            const deltaCols = Math.round(deltaX / colWidth)

            let newSpan = startSpan + deltaCols

            newSpan = Math.max(1, Math.min(maxSpan, newSpan)) // ✅ FIX HERE

            onResize(newSpan)
        }

        function onUp() {
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onUp)
        }

        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...(activeTool === "move" ? attributes : {})}
            onClick={onSelect}
            className={`relative border p-2 ${selected ? "border-blue-500" : "border-transparent"}`}
        >

            {activeTool === "move" && (
                <div {...listeners} className="cursor-move text-xs mb-2">
                    ⠿
                </div>
            )}

            {selected && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete()
                    }}
                    className="absolute top-1 right-1 text-xs bg-red-500 text-white px-2"
                >
                    x
                </button>
            )}

            <BlockRenderer block={block} onChange={onChange} />

            {selected && activeTool === "move" && (
                <div
                    onMouseDown={handleResizeStart}
                    className="
                        absolute bottom-1 right-1
                        w-4 h-4
                        bg-blue-500
                        cursor-ew-resize
                    "
                />
            )}
        </div>
    )
}
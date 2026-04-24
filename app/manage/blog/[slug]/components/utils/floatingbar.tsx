"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { RiCursorLine, RiDragDropLine, RiImageLine, RiText } from "@remixicon/react"

type Tool = "cursor" | "move" | "text" | "image"

type Props = {
    activeTool: Tool
    onChange: (tool: Tool) => void
    disabled: boolean
}

export default function FloatingToolbar({ activeTool, onChange, disabled }: Props) {
    return (
        <div className="
            fixed bottom-6 left-1/2 -translate-x-1/2
            flex items-center gap-1
            bg-background/80 backdrop-blur-md
            border shadow-lg px-2 py-2 items-center
        ">

            <ToolButton
                active={activeTool === "cursor"}
                onClick={() => onChange("cursor")}
                icon={<RiCursorLine size={18} />}
            />

            <ToolButton
                active={activeTool === "move"}
                onClick={() => onChange("move")}
                icon={<RiDragDropLine size={18} />}
            />

            <Separator orientation="vertical" className="h-9 mx-1" />

            <ToolButton
                active={activeTool === "text"}
                onClick={() => onChange("text")}
                icon={<RiText size={18} />}
            />

            <ToolButton
                active={activeTool === "image"}
                onClick={() => onChange("image")}
                icon={<RiImageLine size={18} />}
                disabled={disabled}
            />

        </div>
    )
}

function ToolButton({
    active,
    onClick,
    icon,
    disabled
}: {
    active?: boolean
    onClick: () => void
    icon: React.ReactNode
    disabled?: boolean
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "h-9 w-9",
                active && "bg-accent text-accent-foreground",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            {icon}
        </Button>
    )
}
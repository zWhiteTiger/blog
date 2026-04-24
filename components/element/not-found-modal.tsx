"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFoundModal({
    open
}: {
    open: boolean
}) {
    const router = useRouter()

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ไม่พบ Blog</DialogTitle>
                    <DialogDescription>
                        ไม่พบ blog ที่คุณกำลังเปิดอยู่
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end">
                    <Button onClick={() => router.push("/manage/blog")}>
                        กลับไปหน้า Blog
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
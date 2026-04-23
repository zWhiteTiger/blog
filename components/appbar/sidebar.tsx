"use client"

import React, { useState } from "react"
import { NavigationBar } from "./navbar"
import { Button } from "../ui/button"
import { RiCloseLargeLine, RiMenuLine } from "@remixicon/react"
import Logo from "./logo"

export default function Sidebar() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="ghost"
                size="icon"
            >
                <RiMenuLine />
            </Button>

            {open && (
                <div className="fixed inset-0 z-100 h-screen">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <div
                        className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-black shadow-lg px-4 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center py-5">
                            <Button onClick={() => setOpen(false)} variant="ghost">
                                <RiCloseLargeLine />
                            </Button>
                            <Logo />
                        </div>
                        <NavigationBar />
                        <div className="mt-auto pt-4 border-t">
                            <Button variant="ghost" className="w-full justify-start">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
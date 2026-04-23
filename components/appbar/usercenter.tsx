"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiCustomerServiceLine, RiFundsLine, RiListSettingsLine, RiLogoutBoxRLine, RiPaintBrushLine, RiSettings3Line, RiTranslate2, RiUserLine } from "@remixicon/react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useTheme } from "next-themes"
import { useState } from "react"

import { useSession, signOut, signIn } from "next-auth/react"
import Link from "next/link"

export function UserCenter() {

    const { data: session } = useSession()

    const user = session?.user

    const { theme, setTheme } = useTheme()
    const [language, setLanguage] = useState("en")

    const LANGUAGES = [
        { code: "en", label: "English" },
        { code: "th", label: "ภาษาไทย" },
    ]

    const handleChange = (lang: string) => {
        document.cookie = `lang=${lang}; path=/`
        window.location.reload()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost"><RiUserLine /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 w-full gap-2" align="end">
                <DropdownMenuGroup>

                    {user ? (
                        <div className="flex items-center gap-3 p-4">
                            <Image
                                src={user?.image || "https://github.com/evilrabbit.png"}
                                alt={user?.email || "avatar"}
                                width={48}
                                height={48}
                            />

                            <div className="flex flex-col">
                                <span className="text-sm font-medium truncate max-w-[140px]">
                                    {user?.firstName
                                        ? `${user.firstName} ${user.lastName ?? ""}`
                                        : user?.firstName || "Guest"}
                                </span>

                                <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                                    {user?.email || "-"}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4">
                            <Link href={"/auth/signin"}>
                                <Button
                                    className="w-full"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    )}

                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuGroup>

                    {user ? (
                        <div>
                            <DropdownMenuLabel>Dashboard</DropdownMenuLabel>

                            <DropdownMenuItem>
                                <RiFundsLine />
                                Dashboard
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <RiListSettingsLine />
                                Manage
                            </DropdownMenuItem>

                            <DropdownMenuLabel>Settings</DropdownMenuLabel>

                            <DropdownMenuItem>
                                <RiSettings3Line />
                                User Setting
                            </DropdownMenuItem>
                        </div>
                    ) : (null)}

                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="flex items-center justify-between p-0"
                    >

                        <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger className="w-full border-none justify-between [&>svg]:hidden">

                                <div className="flex items-center gap-2">
                                    <RiPaintBrushLine />
                                    Theme
                                </div>

                                <DropdownMenuShortcut className="w-full flex justify-end"><SelectValue /></DropdownMenuShortcut>
                            </SelectTrigger>

                            <SelectContent
                                position="popper"
                                align="start"
                                sideOffset={4}
                                className="w-[--radix-select-trigger-width]"
                            >
                                <SelectItem value="system">System</SelectItem>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                            </SelectContent>
                        </Select>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="flex items-center justify-between gap-2 p-0"
                    >

                        <Select value={language} onValueChange={handleChange}>
                            <SelectTrigger
                                className="w-full h-9 border-none justify-between [&>svg]:hidden"
                            >
                                <div className="flex items-center gap-2">
                                    <RiTranslate2 />
                                    Language
                                </div>
                                <DropdownMenuShortcut className="w-full flex justify-end"><SelectValue /></DropdownMenuShortcut>
                            </SelectTrigger>

                            <SelectContent
                                position="popper"
                                align="start"
                                sideOffset={4}
                                className="w-[--radix-select-trigger-width]"
                            >
                                {LANGUAGES.map((lang) => (
                                    <SelectItem key={lang.code} value={lang.code}>
                                        {lang.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Customer Services</DropdownMenuLabel>
                    <DropdownMenuItem disabled>
                        <RiCustomerServiceLine />
                        Support 24/7
                        <DropdownMenuShortcut>OOS.</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                {user && (
                    <>
                        <DropdownMenuSeparator className="my-2" />

                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                            >
                                <p className="text-red-600 flex flex-row gap-2">
                                    <RiLogoutBoxRLine /> Log out
                                </p>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

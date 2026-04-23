"use client"

import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { RiHome3Line, RiNewsLine, RiPenNibLine } from "@remixicon/react";

const ListMenu: { title: string; href: string; icon: React.ReactNode }[] = [
    {
        title: "Home",
        href: "/home",
        icon: <RiHome3Line />
    },
    {
        title: "Blog",
        href: "/blog",
        icon: <RiNewsLine />
    },
    {
        title: "Write",
        href: "/blog/create",
        icon: <RiPenNibLine />
    }
]

export function NavigationBar() {
    return (

        <div className="gap-5 items-center w-full">
            <NavigationMenu>
                <NavigationMenuList className="flex flex-col md:flex-row gap-2 md:gap-0">
                    {ListMenu.map((item) => (
                        <NavigationMenuItem key={`${item.title}-${item.href}`} className="w-full md:w-auto">
                            <NavigationMenuLink
                                asChild
                                className={`${navigationMenuTriggerStyle()} w-full w-56 md:w-auto`}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 px-4 py-3 md:px-3 md:py-2 justify-start"
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>

    )
}


"use client"

import Logo from "./logo";
import { NavigationBar } from "./navbar";
import Sidebar from "./sidebar";
import { UserCenter } from "./usercenter";

export default function Appbar() {
    return (

        <div className="container mx-auto flex items-center justify-between py-5 p-4 md:px-0">

            <div className="flex items-center gap-3">
                <div className="block md:hidden">
                    <Sidebar />
                </div>

                <div className="hidden md:flex">
                    <Logo />
                </div>
            </div>

            <div className="flex flex-row gap-5 items-center">

                <div className="hidden md:flex items-center gap-6">
                    <NavigationBar />
                </div>

                <div className="ml-auto">
                    <UserCenter />
                </div>
            </div>

        </div>
    )
}
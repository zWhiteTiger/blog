"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RiArrowRightSLine, RiGoogleFill } from "@remixicon/react"
import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.ok) {
            window.location.href = "/dashboard";
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="container mx-auto flex flex-col gap-5 justify-center items-center h-screen w-full max-w-sm p-5">

            <p className="font-bold text-2xl">Sign In</p>

            <Card className="w-full">
                <CardContent className="p-6 space-y-4">

                    <p className="text-sm text-muted-foreground">
                        Sign in with your email to continue.
                    </p>

                    <Input
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        className="w-full"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        Sign In <RiArrowRightSLine />
                    </Button>

                    <div className="flex items-center gap-2">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">OR</span>
                        <Separator className="flex-1" />
                    </div>

                    <div className="flex flex-col gap-2">

                        {/* Google (optional future) */}
                        <Button variant="outline" className="w-full" disabled>
                            <RiGoogleFill /> Continue with Google
                        </Button>

                        <Link href={"/auth/signup"}>
                            <Button variant="ghost" className="w-full mt-5">
                                Sign Up
                            </Button>
                        </Link>

                    </div>

                </CardContent>
            </Card>

        </div>
    )
}
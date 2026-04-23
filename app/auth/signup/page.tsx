"use client";

import { useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiArrowRightSLine, RiGoogleFill } from "@remixicon/react";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";

import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!accepted) {
            alert("Please accept terms");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post("/api/auth/signup", {
                firstName,
                lastName,
                email,
                password,
            });

            alert(res.data.message);

            window.location.href = "/auth/signin";
        } catch (err: unknown) {
            let message = "Register failed"

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.error ?? message
            } else if (err instanceof Error) {
                message = err.message
            }

            alert(message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container mx-auto flex flex-col gap-5 justify-center items-center h-screen w-full max-w-sm p-5">

            <p className="font-bold text-2xl">Sign Up</p>

            <Card className="w-full">
                <CardContent className="p-6 space-y-4">

                    <p className="text-sm text-muted-foreground">
                        Sign up with your email to continue.
                    </p>

                    <div className="flex flex-row gap-2">
                        <Input
                            placeholder="FirstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Input
                            placeholder="LastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

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

                    <Input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <FieldLabel>
                        <Field orientation="horizontal">
                            <Checkbox
                                id="terms"
                                checked={accepted}
                                onCheckedChange={(v) => setAccepted(Boolean(v))}
                            />
                            <FieldContent>
                                <FieldTitle>Accept Terms & Conditions</FieldTitle>
                                <FieldDescription>
                                    Read{" "}
                                    <Link href="/terms">
                                        Terms & Conditions
                                    </Link>
                                </FieldDescription>
                            </FieldContent>
                        </Field>
                    </FieldLabel>

                    <Button
                        className="w-full"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        Sign Up <RiArrowRightSLine />
                    </Button>

                    <div className="flex items-center gap-2">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground">OR</span>
                        <Separator className="flex-1" />
                    </div>

                    <div className="flex flex-col gap-2">

                        <Button variant="outline" className="w-full" disabled>
                            <RiGoogleFill /> Continue with Google
                        </Button>

                        <Link href={"/auth/signin"}>
                            <Button variant="ghost" className="w-full mt-5">
                                Back to Sign In
                            </Button>
                        </Link>

                    </div>

                </CardContent>
            </Card>

        </div>
    );
}
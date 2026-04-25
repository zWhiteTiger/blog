"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            const timer = setTimeout(() => {
                router.push("/manage/blog");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Not authenticated</div>;
    }

    const user = session.user;

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-3">
            <h1 className="text-2xl font-bold">Login Success</h1>

            <p className="text-gray-600">
                Login as <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
            </p>

            <p className="text-gray-600">Email: {user?.email}</p>

            <p className="text-sm text-gray-400">
                Redirecting to dashboard in 3 seconds...
            </p>
        </div>
    );
}
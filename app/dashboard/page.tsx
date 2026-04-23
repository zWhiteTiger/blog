"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Not authenticated</div>;
    }

    const user = session.user;

    return (
        <div>
            <h1>Dashboard</h1>

            <p>ID: {user?.id}</p>
            <p>Email: {user?.email}</p>
            <p>Name: {user?.firstName} {user?.lastName}</p>
            <p>Image: {user?.image}</p>
        </div>
    );
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PRIVATE_ROUTES = ["/dashboard", "/profile", "/settings"];
const PUBLIC_ROUTES = ["/auth/login", "/auth/signup"];

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    const isPrivate = PRIVATE_ROUTES.some((path) =>
        pathname.startsWith(path)
    );

    const isPublic = PUBLIC_ROUTES.some((path) =>
        pathname.startsWith(path)
    );

    if (isPrivate && !token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    if (isPublic && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}
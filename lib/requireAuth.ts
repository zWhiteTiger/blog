import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);

export async function requireAuth(req: NextRequest): Promise<string | null> {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload.uid as string;
    } catch {
        return null;
    }
}

export function unauthorized(message = "Unauthorized — token required") {
    return NextResponse.json({ success: false, error: message }, { status: 401 });
} 
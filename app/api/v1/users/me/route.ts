import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { requireAuth, unauthorized } from "@/lib/requireAuth";
import { connectDB } from "@/lib/mongoose";

const SALT_ROUNDS = 12;

export async function GET(req: NextRequest) {
    const userId = await requireAuth(req);
    if (!userId) return unauthorized();

    try {
        await connectDB();

        const user = await User.findById(userId).select(
            "-passwordHash -googleId -__v"
        );

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
                provider: user.provider,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    const userId = await requireAuth(req);
    if (!userId) return unauthorized();

    try {
        const body = await req.json();
        const { name, avatarUrl, currentPassword, newPassword } = body;

        const hasUpdate =
            name !== undefined || avatarUrl !== undefined || newPassword !== undefined;

        if (!hasUpdate) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No updatable fields provided (name, avatarUrl, newPassword)",
                },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        const updates: Record<string, unknown> = {};

        if (name !== undefined) {
            if (typeof name !== "string" || name.trim().length === 0) {
                return NextResponse.json(
                    { success: false, error: "name must be a non-empty string" },
                    { status: 400 }
                );
            }
            updates.name = name.trim();
        }

        if (avatarUrl !== undefined) {
            if (typeof avatarUrl !== "string") {
                return NextResponse.json(
                    { success: false, error: "avatarUrl must be a string" },
                    { status: 400 }
                );
            }
            updates.avatarUrl = avatarUrl.trim() || null;
        }

        if (newPassword !== undefined) {
            if (user.provider !== "credentials") {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Password change is not available for SSO accounts",
                    },
                    { status: 400 }
                );
            }

            if (!currentPassword) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "currentPassword is required to set a new password",
                    },
                    { status: 400 }
                );
            }

            const valid = await bcrypt.compare(
                String(currentPassword),
                user.passwordHash!
            );

            if (!valid) {
                return NextResponse.json(
                    { success: false, error: "currentPassword is incorrect" },
                    { status: 401 }
                );
            }

            if (typeof newPassword !== "string" || newPassword.length < 8) {
                return NextResponse.json(
                    { success: false, error: "newPassword must be at least 8 characters" },
                    { status: 400 }
                );
            }

            updates.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, select: "-passwordHash -googleId -__v" }
        );

        return NextResponse.json({
            success: true,
            message: "Profile updated",
            data: {
                id: updated!._id.toString(),
                email: updated!.email,
                firstName: updated!.firstName,
                lastName: updated!.lastName,
                avatarUrl: updated!.avatarUrl,
                provider: updated!.provider,
                updatedAt: updated!.updatedAt,
            },
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}

declare global {
    var _mongooseConn: typeof mongoose | null;
    var _mongoosePromise: Promise<typeof mongoose> | null;
}

let cached = global._mongooseConn ?? null;
let cachedPromise = global._mongoosePromise ?? null;

export async function connectDB(): Promise<typeof mongoose> {
    if (cached) return cached;

    if (!cachedPromise) {
        cachedPromise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    cached = await cachedPromise;
    global._mongooseConn = cached;
    global._mongoosePromise = cachedPromise;

    return cached;
}
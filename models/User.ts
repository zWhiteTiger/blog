import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    passwordHash?: string;
    provider: "credentials" | "google";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        firstName: {
            type: String,
            default: null,
        },
        lastName: {
            type: String,
            default: null,
        },
        avatarUrl: {
            type: String,
            default: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg",
        },
        passwordHash: {
            type: String,
            default: null,
        },
        provider: {
            type: String,
            enum: ["credentials", "google"],
            default: "credentials",
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> =
    mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
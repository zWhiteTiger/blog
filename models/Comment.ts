import mongoose, { Schema } from "mongoose"

const CommentSchema = new Schema(
    {
        blogSlug: {
            type: String,
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
            index: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Comment ||
    mongoose.model("Comment", CommentSchema)
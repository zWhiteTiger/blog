import mongoose, { Schema } from "mongoose"

const ElementSchema = new Schema({
    id: String,
    type: String,

    col: Number,
    row: Number,
    colSpan: Number,
    rowSpan: Number,

    content: {
        text: String,
        images: [String]
    }
})

const BlogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    owner: { type: String, required: true },

    image: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["draft", "saved"],
        default: "draft"
    },

    isPublic: { type: Boolean, default: false },

    elements: [ElementSchema]

}, {
    timestamps: true
})

export default mongoose.models.Blog ||
    mongoose.model("Blog", BlogSchema)
import Blog from "@/models/Blog"

export function generateSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\s\_]+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
}

export async function generateUniqueSlug(baseSlug: string) {
    let slug = baseSlug
    let counter = 1

    while (await Blog.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`
        counter++
    }

    return slug
}
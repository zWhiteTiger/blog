"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Comment = {
  _id: string
  name: string
  message: string
  status: "pending" | "approved" | "rejected"
  createdAt?: string
}

export default function ManageComments() {

  const params = useParams()
  const slug = params.slug as string

  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchComments() {
    try {
      setLoading(true)

      const res = await fetch(`/api/v1/comments/blogs/${slug}?slug=${slug}`)
      const data = await res.json()

      setComments(data)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!slug) return
    fetchComments()
  }, [slug])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/v1/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    })

    // refresh UI
    setComments(prev =>
      prev.map(c =>
        c._id === id ? { ...c, status: status as any } : c
      )
    )
  }

  function nextStatus(status: Comment["status"]) {
    if (status === "approved") return "rejected"
    return "approved"
  }

  function buttonVariant(status: Comment["status"]) {
    return status === "approved" ? "destructive" : "default"
  }

  function buttonLabel(status: Comment["status"]) {
    return status === "approved" ? "Reject" : "Approve"
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">

      <h1 className="text-2xl font-bold">
        Manage Comments
      </h1>

      {loading && (
        <p className="text-sm text-muted-foreground">
          Loading...
        </p>
      )}

      <div className="space-y-3">

        {comments.map((c) => (
          <Card key={c._id} className="p-4 relative">

            {/* STATUS TAG */}
            <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-muted">
              {c.status}
            </div>

            <p className="font-semibold">{c.name}</p>

            <p className="text-sm text-muted-foreground">
              {c.message}
            </p>

            <div className="mt-3">
              <Button
                size="sm"
                variant={buttonVariant(c.status)}
                onClick={() =>
                  updateStatus(c._id, nextStatus(c.status))
                }
              >
                {buttonLabel(c.status)}
              </Button>
            </div>

          </Card>
        ))}

      </div>
    </div>
  )
}
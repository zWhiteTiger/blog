import React, { Suspense } from 'react'
import BlogClient from './components/BlogClient'

type Props = {}

export default function BlogPage({ }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  )
}
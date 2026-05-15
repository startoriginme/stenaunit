"use client"

import { PostCard } from "./post-card"
import useSWR from "swr"

interface Post {
  id: string
  content: string
  author_name: string
  created_at: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function PostsList({ initialPosts }: { initialPosts: Post[] }) {
  const { data: posts } = useSWR<Post[]>("/api/posts", fetcher, {
    fallbackData: initialPosts,
    refreshInterval: 5000,
  })

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
          <span className="text-2xl select-none">✦</span>
        </div>
        <p className="text-muted-foreground text-sm">
          Стена пока пуста — будь первым
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          content={post.content}
          authorName={post.author_name}
          createdAt={post.created_at}
        />
      ))}
    </div>
  )
}

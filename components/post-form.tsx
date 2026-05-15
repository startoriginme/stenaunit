"use client"

import { useState, useTransition } from "react"
import { createPost } from "@/app/actions"

interface PostFormProps {
  onSuccess?: () => void
}

export function PostForm({ onSuccess }: PostFormProps) {
  const [content, setContent] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    startTransition(async () => {
      await createPost(content.trim(), authorName.trim() || "Аноним")
      setContent("")
      setAuthorName("")
      onSuccess?.()
    })
  }

  const remaining = 1000 - content.length
  const isNearLimit = remaining <= 100

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Имя (необязательно)"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          maxLength={50}
          className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground text-[15px] outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
        />
        <textarea
          placeholder="Напиши что-нибудь на стену…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          maxLength={1000}
          className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground text-[15px] resize-none outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-xs tabular-nums transition-colors ${isNearLimit ? "text-destructive" : "text-muted-foreground"}`}>
          {remaining} символов
        </span>
        <button
          type="submit"
          disabled={!content.trim() || isPending}
          className="glass-fab text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
        >
          {isPending ? "Отправка…" : "Опубликовать"}
        </button>
      </div>
    </form>
  )
}

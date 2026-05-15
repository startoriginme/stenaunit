import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"

interface PostCardProps {
  id: string
  content: string
  authorName: string
  createdAt: string
}

export function PostCard({ content, authorName, createdAt }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ru,
  })

  return (
    <article className="glass rounded-2xl px-6 py-5 transition-all duration-200 hover:shadow-[0_8px_40px_oklch(0.58_0.14_240_/_0.13)]">
      <p className="text-foreground whitespace-pre-wrap break-words leading-relaxed text-[15px] mb-4">
        {content}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-[10px] font-semibold select-none">
            {authorName.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-medium text-foreground/70">{authorName}</span>
        <span className="text-muted-foreground/50 text-xs">·</span>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </div>
    </article>
  )
}

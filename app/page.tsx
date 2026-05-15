import { createClient } from "@/lib/supabase/server"
import { PostsList } from "@/components/posts-list"
import { WriteModal } from "@/components/write-modal"
import DisclaimerModal from "@/components/disclaimer-modal"  // без фигурных скобок

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="pt-10 pb-6 px-6 md:px-12">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Стена UNIT
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Анонимно · Без регистрации
        </p>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pb-40">
        <PostsList initialPosts={posts || []} />
      </main>

      <footer className="pb-32 pt-4 px-6 text-center flex flex-col items-center gap-2">
        <DisclaimerModal />
        <p className="text-xs text-muted-foreground/40 tracking-tight">
          Разработано на TypeScript Максом Николаевым из 7 класса
        </p>
      </footer>

      <WriteModal />
    </div>
  )
}

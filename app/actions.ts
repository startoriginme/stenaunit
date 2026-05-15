"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createPost(content: string, authorName: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("posts").insert({
    content,
    author_name: authorName || "Аноним",
  })

  if (error) {
    console.error("[v0] Error creating post:", error)
    throw new Error("Не удалось опубликовать сообщение")
  }

  revalidatePath("/")
}

"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function DisclaimerModal() {  // ← НЕТ async!
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-2"
      >
        Дисклеймер
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative max-w-lg w-full bg-background border border-border rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
              <h2 className="text-xl font-semibold tracking-tight">Правила стены UNIT</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">Администраторы имеют право</span> удалять 
                провокационные и непристойные сообщения.
              </p>

              <p>
                <span className="font-semibold text-foreground">Клевета и явное обсирание других строго запрещены.</span>{' '}
                Если у вас конфликт с человеком — идите и разберитесь с ним лично.
              </p>

              <p>
                Если же вы говорите что-то в шутку, помечайте сообщение:{' '}
                <span className="font-mono bg-muted px-1.5 py-0.5 rounded">(ШУТКА!)</span>. Тогда администрация, 
                возможно, не удалит ваше сообщение (не гарантируем).
              </p>

              <p>
                Мы приветствуем <span className="font-semibold text-foreground">свободу слова</span> и честные, 
                аргументированные высказывания будут оставлены.
              </p>

              <p className="text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl">
                ⚠️ <span className="font-semibold">Просьба не обсирать администрацию, учителей и учеников.</span>{' '}
                Что-то правда может бесить, но знайте — вас в любой момент могут сдать учителям. 
                Админы не будут выдавать информацию, потому что её просто нет.
              </p>

              <p>
                Пожалуйста, хоть это и анонимно, но <span className="font-semibold">держите себя в руках</span>.
              </p>

              <p className="text-muted-foreground text-xs pt-2 border-t border-border mt-2">
                Мы тоже хотели сделать полную свободу слова, но, к сожалению, она несёт огромные риски 
                и для админов, и для учеников, и для репутации школы. Спасибо за понимание.
              </p>
            </div>

            <div className="mt-6 pt-3 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all"
              >
                Понятно, спасибо
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

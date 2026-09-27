"use client";

import { ArrowUp, Eraser, Search, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AnswerCard } from "@/components/chat/answer-card";
import { Button } from "@/components/ui/button";
import { SUGGESTED_QUESTIONS } from "@/lib/mock/scripted-answers";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function ThinkingBubble() {
  return (
    <div className="animate-fade-up rounded-xl border border-ink-200 bg-white p-4 shadow-xs">
      <div className="flex items-center gap-2 text-[12.5px] text-ink-500">
        <Search className="size-3.5 animate-pulse text-brand-500" aria-hidden />
        Recherche des passages pertinents dans le dossier…
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <div className="h-3 w-4/5 animate-pulse rounded bg-ink-100" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-ink-100" />
        <div className="h-16 w-full animate-pulse rounded-lg bg-ink-100/70" />
      </div>
    </div>
  );
}

function Welcome({ onPick }: { onPick: (question: string) => void }) {
  return (
    <div className="animate-fade-up">
      <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Sparkles className="size-4.5" aria-hidden />
      </div>
      <h2 className="mt-3 text-[17px] font-semibold tracking-tight text-ink-900">
        Que voulez-vous savoir ?
      </h2>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
        Posez une question sur vos contrats. Chaque réponse cite le document,
        la page et le passage exact.
      </p>

      <p className="mt-6 mb-2 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
        Exemples
      </p>
      <div className="flex flex-col gap-2">
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onPick(question)}
            className="group flex items-center gap-2.5 rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-left text-[13px] text-ink-700 transition-all hover:border-brand-300 hover:text-ink-900 hover:shadow-sm"
          >
            <Search className="size-3.5 shrink-0 text-ink-300 transition-colors group-hover:text-brand-500" />
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChatPanel({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { messages, askQuestion, pending, clearConversation } = useStore();
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const submit = async (question: string) => {
    const value = question.trim();
    if (!value || pending) return;
    setDraft("");
    await askQuestion(value);
  };

  return (
    <div style={style} className={cn("flex min-h-0 flex-col bg-white", className)}>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.length === 0 ? (
            <Welcome onPick={(question) => void submit(question)} />
          ) : null}

          {messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="flex justify-end">
                <p className="max-w-[85%] animate-fade-up rounded-xl rounded-br-sm bg-ink-900 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white">
                  {message.content}
                </p>
              </div>
            ) : message.pending ? (
              <ThinkingBubble key={message.id} />
            ) : message.answer ? (
              <AnswerCard key={message.id} answer={message.answer} />
            ) : null,
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-ink-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void submit(draft);
            }}
            className="relative rounded-xl border border-ink-200 bg-white shadow-xs transition-colors focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/15"
          >
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void submit(draft);
                }
              }}
              rows={2}
              placeholder="Ex. : a-t-on le droit d'utiliser ce composant pour un usage commercial ?"
              className="w-full resize-none bg-transparent px-3.5 py-3 pr-12 text-[13.5px] leading-relaxed text-ink-900 outline-none placeholder:text-ink-400"
            />
            <Button
              type="submit"
              variant="primary"
              size="icon-sm"
              disabled={pending || draft.trim().length === 0}
              className="absolute right-2.5 bottom-2.5"
              aria-label="Poser la question"
            >
              <ArrowUp />
            </Button>
          </form>

          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[11px] text-ink-400">
              Entrée pour envoyer · Maj+Entrée pour un retour à la ligne
            </p>
            {messages.length > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearConversation}
                className="text-[11px]"
              >
                <Eraser />
                Effacer
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

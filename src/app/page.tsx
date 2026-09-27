"use client";

import { FileText, MessagesSquare } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { ChatPanel } from "@/components/chat/chat-panel";
import { DocumentViewer } from "@/components/viewer/document-viewer";
import { cn } from "@/lib/utils";

/**
 * Vue principale en écran scindé : conversation à gauche, document à droite.
 * Sur mobile, les deux panneaux deviennent deux onglets.
 */
export default function ContractMemoryPage() {
  const [leftWidth, setLeftWidth] = useState(46);
  const [mobileTab, setMobileTab] = useState<"chat" | "document">("chat");
  const containerRef = useRef<HTMLDivElement>(null);

  const startResize = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const onMove = (moveEvent: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const ratio = ((moveEvent.clientX - bounds.left) / bounds.width) * 100;
      setLeftWidth(Math.min(68, Math.max(30, ratio)));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 gap-1 border-b border-ink-200 bg-white px-3 py-2 md:hidden">
        {(
          [
            { value: "chat", label: "Conversation", icon: MessagesSquare },
            { value: "document", label: "Document", icon: FileText },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setMobileTab(tab.value)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
                mobileTab === tab.value
                  ? "bg-ink-900 text-white"
                  : "text-ink-500 hover:bg-ink-50",
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div ref={containerRef} className="flex min-h-0 flex-1 flex-row">
        <ChatPanel
          style={{ flexBasis: `${leftWidth}%` }}
          className={cn(
            "min-w-0 flex-1 md:grow-0 md:shrink-0",
            mobileTab === "chat" ? "flex" : "hidden md:flex",
          )}
        />

        <div
          onPointerDown={startResize}
          role="separator"
          aria-orientation="vertical"
          title="Ajuster la répartition"
          className="hidden w-1.5 shrink-0 cursor-col-resize border-x border-ink-200 bg-ink-100 transition-colors hover:bg-brand-300 md:block"
        />

        <DocumentViewer
          className={cn(
            "min-w-0 flex-1",
            mobileTab === "document" ? "flex" : "hidden md:flex",
          )}
        />
      </div>
    </div>
  );
}

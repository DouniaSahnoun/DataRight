"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Panneau latéral (drawer) bâti sur Radix Dialog : l'interface s'étend sur la
 * droite en desktop et occupe le bas de l'écran en mobile, sans jamais masquer
 * complètement le contexte d'où vient le clic.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-950/25 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={cn(
            "fixed z-50 flex flex-col bg-white shadow-2xl outline-none",
            "inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl",
            "sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-[min(560px,92vw)] sm:rounded-none sm:border-l sm:border-ink-200",
          )}
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-ink-200 px-5 py-4">
            <div className="min-w-0">
              <Dialog.Title className="text-[15px] font-semibold tracking-tight text-ink-900">
                {title}
              </Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
                  {description}
                </Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">
                  Détail de la dépendance économique
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close
              className="-mt-1 -mr-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
              aria-label="Fermer le panneau"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>

          {footer ? (
            <div className="shrink-0 border-t border-ink-200 bg-ink-50/70 px-5 py-3">
              {footer}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";

import { Menu, RotateCcw, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandMark } from "@/components/layout/brand-logo";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

const TITLES: Record<string, string> = {
  "/": "Contract Memory",
  "/cartographie": "Cartographie",
  "/documents": "Documents",
  "/droits": "Registre des droits",
  "/avenants": "Avenants",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resetDemo, documents } = useStore();

  return (
    <div className="flex h-dvh overflow-hidden bg-ink-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-ink-950/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 animate-fade-up shadow-xl">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-ink-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Ouvrir le menu"
            >
              {mobileOpen ? <X /> : <Menu />}
            </Button>
            {/* La barre latérale porte la marque à partir de lg ; en deçà,
                elle est masquée et l'en-tête prend le relais. */}
            <BrandMark size={28} className="lg:hidden" />
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-ink-900">
                {TITLES[pathname] ?? "DataRight"}
              </h2>
              <p className="hidden truncate text-[11px] text-ink-400 sm:block">
                {documents.length} document{documents.length > 1 ? "s" : ""} au dossier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              title="Réinitialiser la démonstration"
              onClick={() => {
                if (
                  window.confirm(
                    "Réinitialiser le dossier ? Les documents importés et la conversation seront perdus.",
                  )
                ) {
                  resetDemo();
                }
              }}
            >
              <RotateCcw />
            </Button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}

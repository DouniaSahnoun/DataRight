"use client";

import {
  FileStack,
  GitCompareArrows,
  MessagesSquare,
  Network,
  Scale,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/layout/brand-logo";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const TOOLS = [
  {
    href: "/",
    label: "Contract Memory",
    description: "Questions & réponses sourcées",
    icon: MessagesSquare,
  },
  {
    href: "/cartographie",
    label: "Cartographie",
    description: "Composants et revenus associés",
    icon: Network,
  },
  {
    href: "/documents",
    label: "Documents",
    description: "Import et bibliothèque",
    icon: FileStack,
  },
  {
    href: "/droits",
    label: "Registre des droits",
    description: "Clauses extraites",
    icon: Scale,
  },
  {
    href: "/avenants",
    label: "Avenants",
    description: "Liens à valider",
    icon: GitCompareArrows,
  },
];

const GROUPS = [{ title: "Espace de travail", items: TOOLS }];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { documents, links, clauses, financials } = useStore();

  const pendingLinks = links.filter((link) => link.status === "suggested").length;

  const counts: Record<string, number | undefined> = {
    "/cartographie": financials.components.length,
    "/documents": documents.length,
    "/droits": clauses.length,
    "/avenants": pendingLinks || undefined,
  };

  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-ink-200 bg-white">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-5 py-5"
      >
        <BrandMark size={36} />
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold tracking-tight text-ink-900">
            DataRight
          </span>
          <span className="block text-[11px] text-ink-500">
            Mémoire contractuelle
          </span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-3">
        {GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-0.5">
            <p className="px-3 pb-1 text-[10.5px] font-semibold tracking-wide text-ink-400 uppercase">
              {group.title}
            </p>
            {group.items.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const Icon = item.icon;
              const count = counts[item.href];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-start gap-3 rounded-lg px-3 py-2 transition-colors",
                    active
                      ? "bg-brand-50 text-brand-800"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
                  )}
                >
                  <Icon
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      active ? "text-brand-600" : "text-ink-400 group-hover:text-ink-600",
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[13px] font-medium">{item.label}</span>
                      {count ? (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-px text-[10px] font-semibold",
                            item.href === "/avenants"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-ink-100 text-ink-600",
                          )}
                        >
                          {count}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-ink-400">
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

    </aside>
  );
}

import {
  AlertTriangle,
  CircleHelp,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import type { RightStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusDefinition {
  label: string;
  short: string;
  icon: LucideIcon;
  className: string;
  dot: string;
  description: string;
}

export const STATUS_META: Record<RightStatus, StatusDefinition> = {
  permission: {
    label: "Permission validée",
    short: "Permission",
    icon: ShieldCheck,
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
    description: "Une clause explicite du dossier autorise cet usage.",
  },
  restriction: {
    label: "Restriction explicite",
    short: "Restriction",
    icon: ShieldAlert,
    className: "border-rose-200 bg-rose-50 text-rose-800",
    dot: "bg-rose-500",
    description: "Une clause du dossier interdit ou limite cet usage.",
  },
  review: {
    label: "À vérifier juridiquement",
    short: "À vérifier",
    icon: AlertTriangle,
    className: "border-amber-200 bg-amber-50 text-amber-900",
    dot: "bg-amber-500",
    description:
      "La clause est conditionnelle ou ambiguë : validation par un juriste requise.",
  },
  insufficient: {
    label: "Information insuffisante",
    short: "Insuffisant",
    icon: CircleHelp,
    className: "border-ink-200 bg-ink-100 text-ink-700",
    dot: "bg-ink-400",
    description: "Le dossier ne contient pas de clause répondant à la question.",
  },
};

export function StatusBadge({
  status,
  size = "md",
  short = false,
  className,
}: {
  status: RightStatus;
  size?: "sm" | "md";
  short?: boolean;
  className?: string;
}) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <span
      title={meta.description}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        meta.className,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        className,
      )}
    >
      <Icon className={size === "sm" ? "size-3" : "size-3.5"} aria-hidden />
      {short ? meta.short : meta.label}
    </span>
  );
}

export function StatusDot({ status }: { status: RightStatus }) {
  return (
    <span
      className={cn("inline-block size-2 rounded-full", STATUS_META[status].dot)}
      aria-hidden
    />
  );
}

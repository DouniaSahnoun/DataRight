import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-ink-200 bg-white shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-ink-900">{title}</h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-ink-500">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9.5 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm text-ink-900 shadow-xs outline-none transition placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm leading-relaxed text-ink-900 shadow-xs outline-none transition placeholder:text-ink-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-9.5 rounded-lg border border-ink-200 bg-white px-2.5 text-sm text-ink-800 shadow-xs outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15",
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-xs font-medium tracking-wide text-ink-500 uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function Chip({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-ink-200 bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-600",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-200 bg-white/60 px-6 py-12 text-center">
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-ink-100 text-ink-500">
        {icon}
      </div>
      <p className="text-sm font-medium text-ink-800">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-ink-500">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

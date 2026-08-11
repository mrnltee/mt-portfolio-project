"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastItem = { id: number; title?: string; description?: string; variant?: "default" | "success" | "error" };
type ToastInput = Omit<ToastItem, "id">;

const ToastContext = createContext<{ toast: (t: ToastInput) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <Toaster>");
  return ctx;
}

const BORDER = {
  default: "border-border-default",
  success: "border-feedback-success",
  error: "border-feedback-error",
};

/** Mount once (e.g. in the layout, or around a demo). Exposes toast() via useToast. */
export function Toaster({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = useCallback((t: ToastInput) => {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), ...t }]);
  }, []);
  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right" duration={4000}>
        {children}
        {toasts.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            onOpenChange={(open) => {
              if (!open) setToasts((prev) => prev.filter((x) => x.id !== t.id));
            }}
            className={cn(
              "flex items-start gap-3 rounded-card border border-l-4 bg-background-surface p-4 shadow-overlay",
              BORDER[t.variant ?? "default"],
            )}
          >
            <div className="min-w-0 flex-1">
              {t.title && <ToastPrimitive.Title className="text-body-sm font-semibold text-text-primary">{t.title}</ToastPrimitive.Title>}
              {t.description && (
                <ToastPrimitive.Description className="text-body-sm text-text-secondary">{t.description}</ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close aria-label="Dismiss" className="focus-ring rounded text-text-tertiary hover:text-text-primary">
              <X className="h-4 w-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] flex w-96 max-w-[100vw] flex-col gap-2 p-4 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

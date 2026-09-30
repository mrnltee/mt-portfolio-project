"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyButton({ text }: { text: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        setCopyState("error");
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button type="button" variant="secondary" size="sm" onClick={handleCopy}>
        {copyState === "copied" ? "Copied!" : copyState === "error" ? "Copy unavailable" : "Copy prompt"}
      </Button>
      <p role="status" aria-live="polite" className="max-w-56 text-right text-caption text-feedback-error">
        {copyState === "error" ? "Clipboard access failed. Select and copy the prompt text manually." : ""}
      </p>
    </div>
  );
}

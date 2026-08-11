"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

/** Click-or-drag file upload dropzone (native input under the hood). */
export function FileUpload({
  accept,
  multiple,
  onFiles,
  className,
}: {
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [names, setNames] = useState<string[]>([]);

  const handle = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setNames(arr.map((f) => f.name));
    onFiles?.(arr);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(e.dataTransfer.files);
        }}
        className={cn(
          "focus-ring flex w-full flex-col items-center gap-2 rounded-card border-2 border-dashed px-6 py-8 text-center transition-colors",
          dragging ? "border-action-primary bg-action-accent-subtle" : "border-border-default hover:border-border-strong",
        )}
      >
        <UploadCloud className="h-6 w-6 text-text-tertiary" />
        <span className="text-body-sm text-text-secondary">
          <span className="font-medium text-action-primary">Click to upload</span> or drag and drop
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => handle(e.target.files)}
      />
      {names.length > 0 && (
        <ul className="mt-2 text-caption text-text-secondary">
          {names.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

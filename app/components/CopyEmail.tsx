"use client";

import { useState } from "react";

const RESET_MS = 2000;

type CopyState = "idle" | "copied" | "failed";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), RESET_MS);
  };

  const label =
    state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy";

  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-line py-2 pl-6 pr-2">
      <span className="font-medium">{email}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="cursor-pointer rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5"
      >
        {label}
        <span role="status" className="sr-only">
          {state === "copied" ? "Email address copied" : ""}
        </span>
      </button>
    </div>
  );
}

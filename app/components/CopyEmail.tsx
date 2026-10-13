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
    state === "copied" ? "Copied" : state === "failed" ? "Failed" : "Copy";

  return (
    <div className="pixel-box inline-flex flex-wrap items-center gap-4 p-2 pl-5">
      <span className="break-all font-medium">{email}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="pixel-btn pixel-btn-solid"
      >
        {label}
      </button>
      <span role="status" className="sr-only">
        {state === "copied"
          ? "Email address copied"
          : state === "failed"
            ? "Copy failed, select the email manually"
            : ""}
      </span>
    </div>
  );
}

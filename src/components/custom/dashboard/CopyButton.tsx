"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function CopyButton({ value }: { value: string }) {
  const handleCopy = () => {
    if (!navigator.clipboard) return alert("Clipboard not supported");
    if (!value || value == "") return alert("No value to copy");
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard");
  };

  return (
    <Button
      disabled={!value || value == ""}
      onClick={handleCopy}
      className="bg-emerald-800 hover:bg-emerald-600 text-gray-50 disabled:bg-gray-300"
    >
      Copy
      <Copy className="h-5 w-5" />
    </Button>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import CopyButton from "./CopyButton";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface UrlCardProps {
  value: string | undefined;
}

export default function KeyCard({ value }: UrlCardProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="rounded-lg bg-gray-100 flex md:items-center max-md:flex-col max-md:gap-y-3 gap-x-8 p-4">
      <p className="shrink-0 font-medium">Stream Key</p>
      <div className="w-full flex items-center gap-x-2">
        <Input
          type={show ? "text" : "password"}
          value={value || ""}
          className="bg-gray-300"
          disabled
          readOnly
          placeholder="Stream Key 🔑"
        />
        <CopyButton value={value || ""} />
      </div>
      <Button
        onClick={() => setShow((prevShow) => !prevShow)}
        disabled={!value || value == ""}
        className="underline"
        variant="link"
      >
        {show ? "Hide Key" : "Show Key"}
      </Button>
    </div>
  );
}

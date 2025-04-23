"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";
import { RELATIVE_PATHS } from "@/lib/constants";

export default function NavbarSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState("");

  const onSubmit = (Event: React.FormEvent<HTMLFormElement>) => {
    Event.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: RELATIVE_PATHS.search,
        query: {
          search: value.trim(),
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  const onClear = () => setValue("");

  if (pathname.startsWith(RELATIVE_PATHS.creatorPage))
    return (
      <h2 className="text-gray-50 font-medium flex items-center">
        🧙‍♂️Creator Dashboard🪄
      </h2>
    );

  return (
    <form
      className="relative w-full md:max-w-[380px] flex items-center-safe"
      onSubmit={onSubmit}
    >
      <Input
        value={value}
        onChange={(Event) => setValue(Event.target.value)}
        placeholder="Search"
        className="rounded-r-none border-0 outline-0 bg-gray-700 text-white"
      />
      {value && (
        <X
          className="absolute right-10 text-muted-foreground hover:opacity-75 transition cursor-pointer"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}

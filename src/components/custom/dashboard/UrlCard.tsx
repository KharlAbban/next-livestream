import { Input } from "@/components/ui/input";
import CopyButton from "./CopyButton";

interface UrlCardProps {
  value: string | undefined;
}

export default function UrlCard({ value }: UrlCardProps) {
  return (
    <div className="rounded-lg bg-gray-100 flex md:items-center max-md:flex-col max-md:gap-y-3 gap-x-8 p-4">
      <p className="shrink-0 font-medium">Server Url</p>
      <div className="w-full flex items-center gap-x-2">
        <Input
          value={value || ""}
          className="bg-gray-300"
          disabled
          readOnly
          placeholder="Server Url 🔗"
        />
        <CopyButton value={value || ""} />
      </div>
    </div>
  );
}

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import NavbarSearch from "./NavbarSearch";
import { Button } from "@/components/ui/button";
import { RELATIVE_PATHS } from "@/lib/constants";
import { Clapperboard } from "lucide-react";

export default async function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-14 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="max-md:mr-8 shrink-0">
        ▶️
      </Link>
      <NavbarSearch />
      <SignedIn>
        <div className="flex items-center gap-3 max-lg:ml-4">
          <Button className="text-gray-50" variant="ghost" asChild>
            <Link href={RELATIVE_PATHS.creatorPage}>
              <Clapperboard className="h-5 w-5" />
              <span className="max-lg:hidden">Dashboard</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Button asChild>
          <Link href={RELATIVE_PATHS.signIn}>Log In</Link>
        </Button>
      </SignedOut>
    </nav>
  );
}

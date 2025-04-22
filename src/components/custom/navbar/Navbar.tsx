import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import NavbarSearch from "./NavbarSearch";
import { Button } from "@/components/ui/button";
import { RELATIVE_PATHS } from "@/lib/constants";
import { Clapperboard } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="max-md:mr-8 shrink-0">
        ▶️
      </Link>
      <NavbarSearch />
      <SignedIn>
        <div className="flex items-center gap-3">
          <Button className="text-gray-50" variant="ghost" asChild>
            <Link href={`${RELATIVE_PATHS.user}/${user?.username}`}>
              <Clapperboard className="h-5 w-5" /> Dashboard
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

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LandingPage() {

  return (
    <div>
      <Button variant="outline" asChild><Link href="/home">Go home</Link></Button>
    </div>
  );
}

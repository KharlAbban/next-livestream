import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "NextLive",
  description: "NextJS LIvestreaming App with Stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased w-screen max-w-9xl overflow-x-hidden`}>
          {children}
          <SanityLive />
          <Toaster richColors closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}

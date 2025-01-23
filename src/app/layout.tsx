import {ClerkProvider} from "@clerk/nextjs"
import type { Metadata } from "next";
import "./globals.css";
import { APP_TITLE } from "@/utils/constants";

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: "Next LiveStream - a live streaming web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

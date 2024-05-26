import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  resume,
}: Readonly<{
  children: React.ReactNode;
  resume: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistMono.variable,
          GeistSans.variable,
        )}
      >
        <Providers>
          {children}
          {resume}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

import "@/styles/globals.css";

import { Inter } from 'next/font/google';
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({
  subsets : ["latin"]
})

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning className={`${inter.className}`}>
      <body>
        <TRPCReactProvider>{children}

        <ModalProvider />

        </TRPCReactProvider>
        <Toaster />
    
      </body>
    </html>
    </ClerkProvider>
  );
}

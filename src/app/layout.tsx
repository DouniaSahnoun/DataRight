import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { StoreProvider } from "@/lib/store";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataRight — Mémoire contractuelle",
  description:
    "Retrouvez instantanément une obligation ou un droit d'usage dans vos contrats, licences et conditions — avec document source, page et citation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}

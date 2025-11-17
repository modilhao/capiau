import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutMotionClient } from "./(sections)/LayoutMotionClient";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "capiau.org",
  description: "Scrollytelling site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <CustomCursor />
        <main>
          <LayoutMotionClient>{children}</LayoutMotionClient>
        </main>
      </body>
    </html>
  );
}
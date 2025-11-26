import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { LayoutMotionClient } from "./(sections)/LayoutMotionClient";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
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
        className={`${inter.variable} ${montserrat.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <CustomCursor />
        <main>
          <LayoutMotionClient>{children}</LayoutMotionClient>
        </main>
      </body>
    </html>
  );
}
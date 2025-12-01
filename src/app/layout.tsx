import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { LayoutMotionClient } from "./(sections)/LayoutMotionClient";
import CustomCursor from "./components/CustomCursor";
import { StructuredData } from "./components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://capiau.org"),
  title: "Capiau - The results-driven, social-first agency you've been looking for.",
  description:
    "The results-driven, social-first agency you've been looking for. Elite thinkers specializing in growth, influencer marketing, and digital marketing.",
  keywords: ["growth agency", "influencer marketing", "digital marketing", "social media agency", "marketing agency"],
  authors: [{ name: "Capiau" }],
  creator: "Capiau",
  publisher: "Capiau",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://capiau.org",
    siteName: "Capiau",
    title: "Capiau - The results-driven, social-first agency you've been looking for.",
    description:
      "The results-driven, social-first agency you've been looking for. Elite thinkers specializing in growth, influencer marketing, and digital marketing.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Capiau - Elite Thinkers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capiau - The results-driven, social-first agency you've been looking for.",
    description:
      "The results-driven, social-first agency you've been looking for. Elite thinkers specializing in growth, influencer marketing, and digital marketing.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Adicione aqui quando tiver Google Search Console
    // google: "your-google-verification-code",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Capiau",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <StructuredData />
        <CustomCursor />
        <main>
          <LayoutMotionClient>{children}</LayoutMotionClient>
        </main>
      </body>
    </html>
  );
}
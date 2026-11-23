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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Capiau",
  },
};

// Snippet fornecido pela Impact.com, mantido literal (verificação da plataforma lê o HTML do <head>).
const IMPACT_UTT_SNIPPET = `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A8302331-0783-42e4-8428-a4530d3921851.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Impact.com Universal Tracking Tag — pedido Denis (23/11/2026) */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: IMPACT_UTT_SNIPPET }}
        />
      </head>
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
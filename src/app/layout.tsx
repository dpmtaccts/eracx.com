import type { Metadata } from "next";
import { Open_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { organizationJsonLd } from "@/lib/metadata";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Era",
    default: "Revenue Systems for B2B Growth | Era",
  },
  description:
    "Era designs, installs, and operates revenue systems. Modular loop programs replace ad-hoc growth teams with compounding relationship infrastructure for B2B companies.",
  metadataBase: new URL("https://eracx.com"),
  openGraph: {
    type: "website",
    siteName: "Era",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body
        className={`${openSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

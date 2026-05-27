import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Setup Flow — Formity",
  description:
    "A multi-step workspace setup form with sidebar navigation. See how to build a React form where users can jump freely between steps.",
  openGraph: {
    siteName: "Formity",
  },
  appleWebApp: {
    title: "Formity",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="h-screen overflow-hidden font-sans">{children}</body>
    </html>
  );
}

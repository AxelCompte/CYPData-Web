import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyP Data - Digital Solutions & Business Intelligence",
  description: "Spanish company offering native mobile apps, desktop applications, Business Intelligence, Big Data websites, Power BI, and data analysis solutions.",
  keywords: ["Android", "iOS", "Business Intelligence", "Big Data", "Power BI", "Data Analysis", "Digital Solutions"],
  authors: [{ name: "CyP Data" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}

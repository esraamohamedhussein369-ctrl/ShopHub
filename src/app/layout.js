import { Inter } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "ShopHub — Discover Amazing Deals from Sellers Near You",
  description:
    "ShopHub is a premier multi-vendor marketplace connecting you with independent local and global sellers for electronics, fashion, home essentials, and more.",
  keywords: ["ShopHub", "marketplace", "multi-vendor", "online shopping", "deals", "electronics", "fashion"],
  authors: [{ name: "ShopHub" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-[#F9FAFB] font-sans text-[#1F2937] antialiased dark:bg-[#0B0F19] dark:text-[#F3F4F6]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

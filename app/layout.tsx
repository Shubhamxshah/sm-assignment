import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const greycliff = localFont({
  src: [
    { path: "./fonts/GreycliffCF-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/GreycliffCF-Medium.woff", weight: "500", style: "normal" },
    { path: "./fonts/GreycliffCF-DemiBold.woff", weight: "600", style: "normal" },
    { path: "./fonts/GreycliffCF-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-greycliff",
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Satvic Movement",
  description: "Your plan for today — yoga, workshops, recipes, and potlucks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${greycliff.variable} ${greycliff.className} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

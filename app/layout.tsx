import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Satvic Movement",
  description: "Your plan for today — yoga, workshops, recipes, and potlucks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${nunito.className} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

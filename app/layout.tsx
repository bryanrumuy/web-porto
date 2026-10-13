import type { Metadata } from "next";
import {
  Pixelify_Sans,
  Press_Start_2P,
  Silkscreen,
  VT323,
} from "next/font/google";
import "./globals.css";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bryan Rumuy | Data Scientist, Web Developer, AI Automation",
  description:
    "Portfolio of Bryan Rumuy: data science, web development and AI automation. Based in Surabaya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pixelifySans.variable} ${pressStart.variable} ${silkscreen.variable} ${vt323.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

/**
 * @module app/layout
 * Root layout — fonts, theme bootstrapping and the CODEVERSE application shell.
 * Dark is the default theme; ThemeProvider + themeInitScript keep it flash-free.
 */
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ThemeProvider, themeInitScript } from "@/lib/theme";

const displayFace = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const bodyFace = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

const codeFace = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CODEVERSE Academy — Interactive Programming Learning",
  description:
    "Học lập trình tương tác: algorithm visualizer, code playground, roadmap cá nhân hoá và luyện tập thuật toán từng bước.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05080a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${displayFace.variable} ${bodyFace.variable} ${codeFace.variable} font-sans`}
      >
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-phosphor focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-0"
          >
            Bỏ qua tới nội dung
          </a>
          <Sidebar />
          <div className="lg:pl-64">
            <Header />
            <main id="main" className="min-h-[calc(100vh-3.5rem)]">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

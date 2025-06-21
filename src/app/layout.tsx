import type { Metadata } from "next";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import LoadingClientWrapper from "@/components/LoadingClientWrapper";
import { Provider as JotaiProvider } from "jotai";
import { Toaster } from "sonner";
import DemoDataRefresher from "@/components/DemoDataRefresher";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description:
    "A fully responsive personal finance app built with Next.js, Tailwind CSS, and TypeScript. Features include transaction tracking, spending summaries, and dynamic data visualizations—designed with a clean, modern UI for optimal user experience.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${publicSans.className}`}>
          <JotaiProvider>
            <Toaster position="top-center"></Toaster>

            <LoadingClientWrapper>
              <DemoDataRefresher></DemoDataRefresher>
              <main>{children}</main>
            </LoadingClientWrapper>
          </JotaiProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

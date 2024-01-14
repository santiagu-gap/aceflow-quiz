import "./globals.css";
import { getAuthSession } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Providers from "@/utils/providers";
import { Plus_Jakarta_Sans } from "next/font/google";

// const myFont = localFont({
//   src: [
//     {
//       path: "../assets/fonts/OpenRunde-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../assets/fonts/OpenRunde-Medium.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../assets/fonts/OpenRunde-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
// });

const myFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aceflow",
  description: "Ace your next test",
  icons: {
    icon: "/favicon.ico",
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={myFont.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

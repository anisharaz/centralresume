import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "central#resume - Effortless Resume Sharing & Management",
  description:
    "Create, manage, and share your resume seamlessly from one platform; With awesome features like resume versioning, single sign-on, and more.",
  openGraph: {
    images: [
      {
        url: "https://static.centralresume.me/opengraph.png",
        alt: "central#resume",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@_centralresume",
    images: [
      {
        url: "https://static.centralresume.me/opengraph.png",
        alt: "central#resume",
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mono.variable} antialiased break-all`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

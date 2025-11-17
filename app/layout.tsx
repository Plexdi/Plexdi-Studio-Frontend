import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plexdi Studio",
  description: "Design + Development Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}

        {/* Toasts */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid #333",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "0.9rem",
            },
            success: {
              iconTheme: {
                primary: "#4ade80",
                secondary: "#111",
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171",
                secondary: "#111",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

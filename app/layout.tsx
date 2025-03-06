"use client";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Product } from "@/types/product";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>E-Commerce</title>
        <meta name="description" content="Shop for clothes" />
        <meta name="keywords" content="keywords" />
        <meta name="author" content="Ammar ElShreef" />
        <link rel="icon" href="./logo.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClerkProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { CartContext } from "@/context/CartContext";
import "./globals.css";

const geistSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: "700",
});

const geistMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: "700",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <html className="flex w-full h-full justify-center items-center">
        <body className="bg-secoundry-200 ">
          <Loading />
        </body>
      </html>
    );

  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <html lang="en">
          <head>
            <title>E-Commerce</title>
            <meta name="description" content="Shop for clothes" />
            <meta name="keywords" content="keywords" />
            <meta name="author" content="Ammar ElShreef" />
            <link rel="icon" href="./logo.svg" />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
          >
            <div className="min-h-screen bg-secoundry-200 flex flex-col">
              <Banner />
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import CartApis from "@/services/CartApis";
import { Product } from "@/types/product";

export default function Navbar() {
  const { user } = useUser();
  const { cartCount, setCartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const url = window.location.href.toString();
    setIsLoggedIn(url.includes("login") || url.includes("register"));
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const getCartItems = async () => {
    try {
      const res = await CartApis.getUserCartItems(
        user?.primaryEmailAddress?.emailAddress
      );

      if (res?.data?.data) {
        const newCart = res.data.data.map(
          (citem: { id: number; products: Product[] }) => ({
            id: citem.id,
            product: citem.products[0],
          })
        );
        setCartItems(newCart);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("error from cart", error);
      setCartItems([]);
    }
  };

  const handleRefresh = (url: string) => {
    window.location.href = url;
  };

  return (
    !isLoggedIn && (
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">
                  StyleHub
                </span>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <ModeToggle />

              {!user ? (
                <div className="hidden sm:flex sm:ml-2 sm:gap-4">
                  <Button
                    asChild
                    onClick={() => handleRefresh("login")}
                    variant="outline"
                    size="sm"
                    className="text-sm px-4 bg-transparent cursor-pointer text-black dark:text-white border-black dark:border-white hover:bg-white hover:text-white dark:hover:text-black"
                  >
                    <a>Login</a>
                  </Button>

                  <div className="sm:flex">
                    <Button
                      asChild
                      onClick={() => handleRefresh("register")}
                      size="sm"
                      className="text-sm px-4 cursor-pointer"
                    >
                      <a>Register</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Link href="/cart" className="mr-2 relative">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-6 w-6" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <UserButton />
                </div>
              )}

              <div className="md:hidden ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
              <Link
                href="/"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {!user && (
                <div className="flex items-center justify-center space-x-2 sm:flex sm:ml-2 sm:gap-4">
                  <Button
                    asChild
                    onClick={() => handleRefresh("login")}
                    variant="outline"
                    size="sm"
                    className="text-sm px-4 bg-transparent cursor-pointer text-black dark:text-white border-black dark:border-white hover:bg-white hover:text-white dark:hover:text-black"
                  >
                    <a>Login</a>
                  </Button>{" "}
                  <p> Or </p>{" "}
                  <div className="sm:flex">
                    <Button
                      asChild
                      onClick={() => handleRefresh("register")}
                      size="sm"
                      className="text-sm px-4 cursor-pointer"
                    >
                      <a>Register</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    )
  );
}

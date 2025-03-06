"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const url = window.location.href.toString();
    setIsLoggedIn(url.includes("login") || url.includes("register"));
  }, []);

  return (
    !isLoggedIn && (
      <footer className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">StyleHub</h3>
              <p className="text-muted-foreground">
                Premium clothing for all styles and occasions. Quality you can
                trust.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className="text-muted-foreground hover:text-primary"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=T-Shirts"
                    className="text-muted-foreground hover:text-primary"
                  >
                    T-Shirts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=Jeans"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Jeans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=Dresses"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Dresses
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-foreground hover:text-primary">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <Mail size={20} />
                </a>
              </div>
              <p className="text-muted-foreground">
                Subscribe to our newsletter
              </p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border border-border rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Ammar ElShreef. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.jpg')",
            filter: "brightness(0.4)",
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Elevate Your Style
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
          Discover the latest trends and timeless classics in our curated
          collection of premium clothing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-black"
          >
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

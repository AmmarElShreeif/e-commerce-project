"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductApis from "@/services/ProductApis";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      const res = await ProductApis.getLatetProducts();
      setProductList(res.data.data);
    } catch (error) {
      console.error("Failed to fetch latest products:", error);
    }
  };

  const featuredProducts = productList.slice(0, 4);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button asChild variant="ghost">
            <Link href="/products" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

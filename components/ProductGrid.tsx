"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import ProductApis from "@/services/ProductApis";

interface ProductGridProps {
  product: Product;
  index?: number;
}

export default function ProductGrid({ product }: ProductGridProps) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productList.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product?.documentId}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={product?.image?.map((img: { url: string }) => img?.url)}
            alt={product?.title}
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            {product?.category}
          </span>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold line-clamp-1 hover:text-primary transition-colors">
            {product?.title}
          </h3>
        </Link>
        <p className="mt-2 text-2xl font-bold">${product?.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

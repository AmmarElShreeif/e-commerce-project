"use client";
import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { Product } from "@/types/product";
import ProductApis from "@/services/ProductApis";
import ProductSkeleton from "@/components/SkeletonProduct";
import { colors, sizes } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface ProductDetailsType {
  category: string;
  product: Product[];
}

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product | never[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const productId = params.productId as string;

  // If product not found, show 404
  if (!productId) {
    notFound();
  }

  useEffect(() => {
    const fetchProductData = async () => {
      // Named function for clarity
      try {
        const res = await ProductApis.getProductById(productId);
        if (res?.data?.data) {
          setProductDetails(res?.data?.data);
          await fetchProductList(res.data.data);
        } else {
          console.error("No product data found for ID:", productId);
          setProductDetails(null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProductDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const fetchProductList = async (product: ProductDetailsType) => {
    try {
      const res = await ProductApis.getProductByCategory(product.category);
      if (res?.data?.data) {
        setProductList(res.data.data);
      } else {
        console.error("No products found for category:", product.category);
        setProductList([]);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      setProductList([]);
    }
  };

  if (isLoading) {
    return <ProductSkeleton />;
  }

  const product = productDetails;

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
            <img
              src={
                product?.image && Array.isArray(product.image)
                  ? product.image.map((img: { url: string }) => img?.url)
                  : product?.image?.url ?? ""
              }
              alt={product.title}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <Select onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Color</h3>
                <Select onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex md:flex-1"
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RotateCcw className="h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Returns</h4>
                    <p className="text-sm text-muted-foreground">
                      Within 30 days
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      Encrypted payment processing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6">
              <p className="text-foreground">{product.description}</p>
              <p className="mt-4 text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </TabsContent>
            <TabsContent value="details" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Materials</h3>
                  <p className="text-muted-foreground">100% Premium Cotton</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fit</h3>
                  <p className="text-muted-foreground">Regular fit</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Care</h3>
                  <p className="text-muted-foreground">
                    Machine wash cold, tumble dry low
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Origin</h3>
                  <p className="text-muted-foreground">Imported</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} filled={i < 4} />
                      ))}
                    </div>
                    <span className="ml-2 font-semibold">4.0 out of 5</span>
                  </div>
                  <p className="text-muted-foreground">Based on 24 reviews</p>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-border pb-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold">John D.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} filled={i < 5} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Verified Purchase
                    </p>
                    <p>
                      Great quality and fits perfectly. Would definitely
                      recommend!
                    </p>
                  </div>

                  <div className="border-b border-border pb-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold">Sarah M.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} filled={i < 4} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Verified Purchase
                    </p>
                    <p>
                      The material is very comfortable. Shipping was fast too.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold">Michael T.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} filled={i < 3} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Verified Purchase
                    </p>
                    <p>
                      Slightly smaller than expected, but otherwise good
                      quality.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Star component for reviews
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-5 w-5 ${
        filled ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 15.585l-5.196 2.733a1 1 0 01-1.451-1.054l.992-5.783-4.2-4.098a1 1 0 01.554-1.705l5.803-.844 2.598-5.263a1 1 0 011.8 0l2.598 5.263 5.803.844a1 1 0 01.554 1.705l-4.2 4.098.992 5.783a1 1 0 01-1.451 1.054L10 15.585z"
        clipRule="evenodd"
      />
    </svg>
  );
}

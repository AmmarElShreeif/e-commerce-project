"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    setIsCheckingOut(true);

    router.push(`/checkout?amount=${(cartTotal * 1.1).toFixed(2)}`);

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      setIsCheckingOut(false);
    }, 2000);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      toast({
        title: "Promo code applied!",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
        variant: "destructive",
      });
    }
    setPromoCode("");
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="divide-y divide-border">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item?.product?.image?.map(
                              (img: { url: string }) => img?.url
                            )}
                            alt={item?.product?.title}
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium">
                                <Link
                                  href={`/products/${item?.product?.documentId}`}
                                  className="hover:text-primary"
                                >
                                  {item?.product?.title}
                                </Link>
                              </h3>
                              <p className="ml-4 text-lg font-medium">
                                ${(item?.product?.price).toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item?.product?.category}
                            </p>
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-3">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(
                                    item.documentId,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item?.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-border px-6 py-4">
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flow-root">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p className="font-medium">${cartTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Shipping</p>
                      <p className="font-medium">Free</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Tax</p>
                      <p className="font-medium">
                        ${(cartTotal * 0.1).toFixed(2)}
                      </p>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between">
                      <p className="font-semibold">Total</p>
                      <p className="font-semibold">
                        ${(cartTotal * 1.1).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex space-x-2 mb-4">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      "Processing..."
                    ) : (
                      <>
                        Checkout <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>We accept</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="w-10 h-6 bg-muted rounded"></div>
                    <div className="w-10 h-6 bg-muted rounded"></div>
                    <div className="w-10 h-6 bg-muted rounded"></div>
                    <div className="w-10 h-6 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

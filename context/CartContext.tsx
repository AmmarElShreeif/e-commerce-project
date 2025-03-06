import React, { createContext, useContext, useState, useMemo } from "react";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import CartApis from "@/services/CartApis";

type CartItem = Product & { quantity: number };

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item?.product?.price),
      0
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.length;
  }, [cartItems]);

  const addToCart = async (product: Product) => {
    if (!user) {
      window.location.href = "login";
      return;
    }

    const data = {
      data: {
        username: user?.user?.fullName,
        email: user?.user?.primaryEmailAddress?.emailAddress,
        products: [product?.documentId],
      },
    };

    try {
      const res = await CartApis.addToCart(data);

      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item?.product?.documentId === product.documentId
        );

        if (existingItem) {
          toast({
            title: "Product updated",
            description: `${product.title} quantity increased in your cart`,
          });

          return prevItems.map((item) =>
            item.documentId === product.documentId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast({
            title: "Product added",
            description: `${product.title} added to your cart`,
          });

          return [...prevItems, { ...product, quantity: 1 }];
        }
      });

      console.log("cart created successfully", res.data.data);
    } catch (error) {
      console.log("error from cart", error);
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  };

  const deleteCartItem = async (documentId: string) => {
    try {
      const response = await CartApis.deleteCartItem(documentId);
      console.log("Item deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to delete item:", error);
      throw error;
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await deleteCartItem(id);

      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);

        const itemToRemove = prevItems.find((item) => item.id === id);
        if (itemToRemove) {
          toast({
            title: "Product removed",
            description: `${itemToRemove.title} removed from your cart`,
          });
        } else {
          console.log("Item not found in cart");
        }

        return updatedItems;
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item?.product?.documentId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

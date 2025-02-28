"use client"; 
import { useContext, useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navigationItems, ProductType } from "../data";
import Cart from "./Cart";
import { CartContext } from "@/context/CartContext";
import CartApis from "@/utils/CartApis";

const Header = () => {
  const { user } = useUser();
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const handleRefresh = (url: string) => {
    window.location.href = url;
  };

  useEffect(() => {
    const url = window.location.href.toString();
    setIsLoggedIn(url.includes("sign-up") || url.includes("sign-in"));
  }, []);

  useEffect(() => {
    if (user) {
      getCartItems();
    } else {
      setCart([]);
    }
  }, [user]);

  const getCartItems = async () => {
    try {
      const res = await CartApis.getUserCartItems(
        user?.primaryEmailAddress?.emailAddress
      );

      if (res?.data?.data) {
        const newCart = res.data.data.map(
          (citem: { id: number; products: ProductType[] }) => ({
            id: citem.id,
            product: citem.products[0],
          })
        );
        setCart(newCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("error from cart", error);
      setCart([]);
    }
  };

  return (
    !isLoggedIn && (
      <header>
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <button
                onClick={() => handleRefresh("/")}
                className="flex text-primary-100"
              >
                <Image alt="logos" src="./logo.svg" width={30} height={30} />
                <span className="font-extrabold ml-2 text-lg">TrendHive</span>
              </button>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-base">
                  {navigationItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="text-primary-200 transition font-semibold hover:text-primary-200/60"
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="flex sm:gap-4">
                  <button
                    onClick={() => handleRefresh("/sign-in")}
                    className="rounded-md bg-primary-100 transition hover:bg-primary-200 px-5 py-2.5 text-sm font-semibold text-white shadow"
                  >
                    Login
                  </button>

                  <div className="sm:flex">
                    <button
                      onClick={() => handleRefresh("/sign-up")}
                      className="rounded-md bg-gray-100 border border-gray-300 transition hover:bg-gray-300 px-5 py-2.5 text-sm font-semibold text-primary-100"
                    >
                      Register
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-3">
                  <button
                    className="flex text-lg font-bold text-primary-100 gap-x-1 items-center"
                    onClick={() => setShowCart(true)}
                  >
                    <ShoppingCartIcon size={27} color="#2B3445" />(
                    {cart?.length})
                  </button>
                  <UserButton afterSwitchSessionUrl="/" />
                  {showCart && (
                    <Cart showCart={showCart} setShowCart={setShowCart} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;

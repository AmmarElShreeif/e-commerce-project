"use client";
import { CartContext } from "@/context/CartContext";
import { ProductType } from "@/data";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useContext } from "react";

type CartType = {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
};

const Cart = ({ showCart, setShowCart }: CartType) => {
  const { cart } = useContext(CartContext);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleRefresh = (url: string) => {
    window.location.href = url;
  };

  return (
    showCart && (
      <div
        className="h-[300px] w-[250px]
    bg-gray-100 z-10 rounded-md border shadow-sm
    absolute mx-10 right-10 top-12 p-5 overflow-auto"
      >
        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            {cart?.map((item: ProductType) => (
              <li key={item?.id} className="flex items-center gap-4">
                <img
                  src={item?.product?.image?.map(
                    (img: { url: string }) => img?.url
                  )}
                  alt=""
                  className="object-cover w-16 h-16 rounded"
                />

                <div>
                  <h3 className="text-sm text-primary-100 line-clamp-1">
                    {item?.product?.title}
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-primary-200">
                    <div>
                      <dt className="inline">Category:</dt>
                      <dd className="inline">{item?.product?.category}</dd>
                    </div>

                    <div>
                      <dt className="inline">Price:</dt>
                      <dd className="inline">{item?.product?.price}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center w-full mt-5 space-y-4 text-center">
          <button
            onClick={() => handleRefresh("/cart")}
            className="block px-5 py-3 text-sm text-gray-100 transition bg-primary-100 rounded hover:bg-primary-200"
          >
            View my cart ({cart?.length})
          </button>

          <Link
            href="/"
            onClick={handleClick}
            className="inline-block text-sm text-primary-100 underline transition underline-offset-4 hover:text-gray-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    )
  );
};

export default Cart;

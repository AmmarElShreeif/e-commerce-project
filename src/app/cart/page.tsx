"use client";
import React, { useContext, useState } from "react";
import { DeleteIcon } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import Loading from "@/components/Loading";
import CartApis from "@/utils/CartApis";
import { ProductType } from "@/data";

const CartSection = () => {
  const { cart, setCart } = useContext(CartContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = (url: string) => {
    window.location.href = url;
  };

  const deleteCartItemFromList = async (documentId: string) => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const res = await CartApis.deleteCartItem(documentId);

      console.log("this from server:", res);

      if (res.status === 200 || res.status === 204) {
        setCart((oldCart) =>
          oldCart.filter(
            (item: { documentId: string }) => item?.documentId !== documentId
          )
        );
      } else {
        console.log("Item not deleted!");
      }
    } catch (error) {
      console.log("error from delete Cart", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = (documentId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteCartItemFromList(documentId);
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item: { product: { price: number } }) => {
      totalAmount = totalAmount + Number(item?.product?.price);
    });
    return totalAmount;
  };

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="text-center">
            <h1 className="text-xl font-bold text-secoundry-100 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart?.map((item: ProductType) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    src={item?.product?.image?.map(
                      (img: { url: string }) => img?.url
                    )}
                    alt=""
                    className="object-cover w-16 h-16 rounded"
                  />

                  <div>
                    <h3 className="text-sm font-semibold text-primary-100">
                      {item?.product?.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[12px] text-primary-200">
                      <div>
                        <dt className="inline">Category:</dt>
                        <dd className="inline">{item?.product?.category}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex items-center justify-end flex-1 gap-2">
                    <span className="text-primary-100 font-semibold text-sm">
                      ${item?.product?.price}
                    </span>

                    <button
                      onClick={() => confirmDelete(item?.product?.documentId)}
                      disabled={isDeleting}
                      className="text-primary-200 transition hover:text-red-600"
                    >
                      {isDeleting ? <Loading /> : <DeleteIcon size={30} />}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-end pt-8 mt-8 border-t border-secoundry-200">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-primary-100">
                  <div className="flex justify-between text-base font-semibold">
                    <dt>Total</dt>
                    <dd className="font-bold text-primary-100">
                      ${getTotalAmount()}
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      handleRefresh(`/checkout?amount=${getTotalAmount()}`);
                    }}
                    className="block px-5 py-3 text-sm font-bold text-gray-100 transition bg-primary-100 rounded hover:bg-primary-200"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-primary-200 text-[12px]">
              Note: All Items will be sent via Email
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;

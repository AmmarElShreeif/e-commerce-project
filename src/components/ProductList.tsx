"use client";
import React from "react";
import RattingReview from "./RatingReview";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ProductType } from "@/data";

type ProductListProps = {
  productList: ProductType[];
};

const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  const user = useUser();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="py-32 px-7 flex flex-wrap items-center gap-10 justify-center">
      {productList.map((product: ProductType) => (
        <div key={product.id}>
          <div
            onClick={() =>
              router.push(`/product-details/${product?.documentId}`)
            }
            className="w-full flex flex-col cursor-pointer items-center justify-center max-w-xs bg-white border hover:border-primary-100 transition rounded-lg shadow-sm "
          >
            <img
              className="py-0 px-4 rounded-t-lg hover:scale-105 transition"
              src={product?.image?.map((img: { url: string }) => img?.url)}
              width={300}
              height={300}
              alt="product image"
            />

            <div className="pb-5">
              <a href="#">
                <h5 className="text-lg font-semibold text-center text-primary-100 ">
                  {product?.title}
                </h5>
                <span className="block text-center text-2xl font-bold text-primary-100 ">
                  ${product?.price}
                </span>
              </a>
              <div className="flex items-center justify-center mt-0 mb-3">
                <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                  <RattingReview rating={product?.rate} />
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center justify-center">
                <button
                  onClick={handleAddToCart}
                  className="text-primary-100 bg-transparent border border-primary-100 hover:bg-primary-100 hover:text-white focus:ring-4 focus:outline-none font-bold rounded-md text-base px-6 py-2.5 text-center"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

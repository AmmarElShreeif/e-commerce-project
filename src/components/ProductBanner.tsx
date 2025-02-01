"use client";
import React, { useContext } from "react";
import RattingReview from "./RatingReview";
import ProductSkeleton from "./SkeletonProduct";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "@/utils/CartApis";
import { CartContext } from "@/context/CartContext";
import { ProductType } from "@/data";

interface productType {
  product: ProductType;
  isLoading?: boolean;
}

const ProductBanner = ({ product, isLoading }: productType) => {
  const user = useUser();
  const router = useRouter();
  const { setCart }: any = useContext(CartContext);

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user?.user?.fullName,
          email: user?.user?.primaryEmailAddress?.emailAddress,
          products: [product?.documentId],
        },
      };

      try {
        const res = await CartApis.addToCart(data);
        setCart((oldCart: any) => [
          ...oldCart,
          { documentId: res?.data?.data, product },
        ]);
        console.log("cart created seccusful", res.data.data);
      } catch (error) {
        console.log("error from cart", error);
      }
    }
  };

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 p-6 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={
            product?.image && Array.isArray(product.image)
              ? product.image.map((img: { url: string }) => img?.url)
              : product?.image?.url ?? ""
          }
          alt="Product Image"
          className="max-w-full h-auto object-contain"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl text-secoundry-100 md:text-3xl font-bold mb-4">
          {product?.title}
        </h1>
        <div className="text-sm flex flex-col items-start gap-y-1 mb-3 text-primary-200">
          Rated:{" "}
          <span className="flex items-center justify-center gap-x-1">
            <RattingReview rating={product?.rate} />({product?.rate})
          </span>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary-100 mb-2">
            Option
          </h3>
          <div className="flex flex-wrap gap-2">
            {["option 1", "option 2", "option 3", "option 4"].map((option) => (
              <button
                key={option}
                className="px-4 py-2 border text-primary-200 border-gray-300 rounded-lg hover:bg-gray-200 transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary-100 mb-2">Type</h3>
          <div className="flex flex-wrap gap-2">
            {["type 1", "type 2", "type 3"].map((type) => (
              <button
                key={type}
                className="px-4 py-2 border text-primary-200 border-gray-300 rounded-lg hover:bg-gray-200 transition"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-primary-100 mb-2">
            $110.00
          </div>
          <p className="text-sm text-green-600 mb-4">Stock Available</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-6 py-3 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition mb-4"
        >
          Add To Cart
        </button>

        <p className="text-sm text-primary-200">
          Sold By:{" "}
          <span className="font-semibold text-secoundry-100">
            {product?.seller}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductBanner;

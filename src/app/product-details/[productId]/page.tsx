"use client";
import { useEffect, useState } from "react";
import ProductApis from "@/utils/ProductApis";
import ProductBanner from "@/components/ProductBanner";
import ProductList from "@/components/ProductList";
import ProductSkeleton from "@/components/SkeletonProduct";
import { ProductType } from "@/data";
import { useParams } from "next/navigation";

interface ProductDetailsType {
  category: string;
  product: ProductType;
}

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const productId = params.productId as string;

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
        console.warn("No products found for category:", product.category);
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

  if (!productDetails) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="px-10 py-7">
      <div>
        <ProductBanner product={productDetails} />
      </div>
      <div className="mt-24">
        <h2 className="text-primary-100 font-bold text-xl">Similar Product</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductDetails;

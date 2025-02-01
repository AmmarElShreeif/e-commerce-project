"use client";
import { useEffect, useState } from "react";
import ProductApis from "@/utils/ProductApis";
import ProductList from "./ProductList";

const ProductsSection = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = async () => {
    try {
      const res = await ProductApis.getLatetProducts();
      setProductList(res.data.data);
    } catch (error) {
      console.error("Failed to fetch latest products:", error);
    }
  };

  return <ProductList key="product-list" productList={productList} />;
};
export default ProductsSection;

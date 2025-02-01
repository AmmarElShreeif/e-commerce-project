import axiosClient from "./axiosClient";

const getLatetProducts = () => axiosClient.get("/products?populate=*");
const getProductById = (documentId: string) =>
  axiosClient.get(`/products/${documentId}?populate=*`);

const getProductByCategory = (category: string) =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

export default {
  getLatetProducts,
  getProductById,
  getProductByCategory,
};

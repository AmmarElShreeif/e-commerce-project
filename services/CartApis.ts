import axiosClient from "./axiosClient";

interface PayloadType {
  data: {
    username: string | null | undefined;
    email: string | undefined;
    products: string[];
  };
}

const addToCart = (payload: PayloadType) => axiosClient.post("/carts", payload);

const getUserCartItems = (email: string | undefined) =>
  axiosClient.get(
    `carts?populate[products][populate]=image&filters[email][$eq]=${email}`
  );

const deleteCartItem = (id: string) => axiosClient.delete(`/carts/${id}`);

export default {
  addToCart,
  getUserCartItems,
  deleteCartItem,
};

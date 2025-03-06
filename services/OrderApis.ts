import axiosClient from "./axiosClient";

interface DataType {
  data: {
    email: string | undefined;
    username: string | null | undefined;
    amount: number;
    products: never[];
  };
}

const createOrder = (data: DataType) => axiosClient.post("/orders", data);

export default {
  createOrder,
};

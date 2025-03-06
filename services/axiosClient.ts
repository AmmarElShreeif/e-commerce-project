import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = "https://ecommerce-strapi-production-35f4.up.railway.app/api";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export default axiosClient;

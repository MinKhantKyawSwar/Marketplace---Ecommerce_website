import { axiosInstance } from "./axiosInstance";

//check current user
export const getAllProducts = async (payload) => {
  try {
    const response = await axiosInstance.get("/admin/products", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

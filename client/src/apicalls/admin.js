import { axiosInstance } from "./axiosInstance";

//check current user
export const getAllProducts = async (page, perPage) => {
  try {
    const response = await axiosInstance.get(
      `/admin/products?page=${page}&perPage=${perPage}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//approve product
export const approveProduct = async (productId)=> {
  try {
    const response = await axiosInstance.post(`/admin/product-approve/${productId}`,{
      validateStatus : () => true
    })
    return response.data
  }   catch (error) {
  return error.message;
}
}

//reject product
export const rejectProduct = async (productId)=> {
  try {
    const response = await axiosInstance.post(`/admin/product-reject/${productId}`,{
      validateStatus : () => true
    })
    return response.data
  } catch (error) {
    return error.message;
   }
}

// rollback product
export const rollBackProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-rollback/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//ban user
export const banUser = async (userId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/user-ban/${userId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

//unban user
export const unbanUser = async (userId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/user-unban/${userId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}
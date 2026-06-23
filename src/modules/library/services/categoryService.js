import axiosInstance from "@/utils/axiosInstance";

export const createLibraryCategoryService = async (payload) => {
  return axiosInstance.post(`/library-category`, payload)
}

export const getLibraryCategoryService = async () => {
  return await axiosInstance.get(`/library-category`);
};

export const editLibraryCategoryService = (id, data) => {
  return axiosInstance.put(`/library-category/${id}`, data);
};

export const deleteLibraryCategoryService = (id) => {
  return axiosInstance.delete(`/library-category/${id}`);
};
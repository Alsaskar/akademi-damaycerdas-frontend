import axiosInstance from "@/utils/axiosInstance";

export const createLibraryService = async (payload) => {
  return axiosInstance.post(`/library`, payload)
}

export const getLibraryService = async (page = 1, search = "", status = "", category = "") => {
  return await axiosInstance.get(`/library?page=${page}&search=${search}&status=${status}&category=${category}`);
};

export const getDetailLibraryService = async (id) => {
  return await axiosInstance.get(`/library/detail/${id}`);
};

export const getDetailBySlugLibraryService = async (slug) => {
  return await axiosInstance.get(`/library/detail-slug/${slug}`);
};

export const editLibraryService = (id, data) => {
  return axiosInstance.put(`/library/${id}`, data);
};

export const deleteLibraryService = (id) => {
  return axiosInstance.delete(`/library/${id}`);
};
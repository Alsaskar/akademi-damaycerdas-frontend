import axiosInstance from "@/utils/axiosInstance";

export const createSessionService = async (payload) => {
  return axiosInstance.post(`/training-sesi`, payload)
}

export const getSessionService = async (trainingId) => {
  return await axiosInstance.get(`/training-sesi?trainingId=${trainingId}`);
};

export const getDetailSessionService = async (slug) => {
  return await axiosInstance.get(`/training-sesi/detail/${slug}`);
};

export const editSessionService = (id, data) => {
  return axiosInstance.put(`/training-sesi/${id}`, data);
};

export const deleteSessionService = (id) => {
  return axiosInstance.delete(`/training-sesi/${id}`);
};
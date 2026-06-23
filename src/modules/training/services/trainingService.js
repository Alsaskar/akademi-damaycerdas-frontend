import axiosInstance from "@/utils/axiosInstance";

export const createTrainingService = async (payload) => {
  return axiosInstance.post(`/training`, payload)
}

export const getTrainingService = async (page = 1, search = "", status = "") => {
  return await axiosInstance.get(`/training?page=${page}&search=${search}&status=${status}`);
};

export const getDetailTrainingService = async (slug) => {
  return await axiosInstance.get(`/training/detail/${slug}`);
};

export const getParticipantsTrainingService = async (trainingId, page = 1, search = "") => {
  return await axiosInstance.get(`/training/participants/${trainingId}?page=${page}&search=${search}`);
};

export const editTrainingService = (id, data) => {
  return axiosInstance.put(`/training/${id}`, data);
};

export const deleteTrainingService = (id) => {
  return axiosInstance.delete(`/training/${id}`);
};

export const leaveParticipantTrainingService = (trainingId, memberId) => {
  return axiosInstance.delete(`/training/leave-participant/${trainingId}/${memberId}`);
};

export const joinMemberTrainingService = async (payload) => {
  return axiosInstance.post(`/training/join-member`, payload)
}

export const getMyTrainingService = async (page = 1, search = "") => {
  return await axiosInstance.get(`/training/my-training?page=${page}&search=${search}`);
};
import axiosInstance from "@/utils/axiosInstance";

export const createMateriTrainingService = async (payload) => {
  return axiosInstance.post(
    "/materi",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
}

export const getMateriTrainingService = async (trainingId) => {
  return await axiosInstance.get(`/materi?trainingId=${trainingId}`);
};

// export const getDetailTrainingService = async (slug) => {
//   return await axiosInstance.get(`/training/detail/${slug}`);
// };

// export const editTrainingService = (id, data) => {
//     return axiosInstance.put(`/training/${id}`, data);
// };

export const deleteMateriTrainingService = (id) => {
  return axiosInstance.delete(`/materi/${id}`);
};
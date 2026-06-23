import axiosInstance from "@/utils/axiosInstance";

export const createMemberService = async (payload) => {
  return axiosInstance.post(`/member`, payload)
}

export const uploadFotoProfilMemberService = async (memberId, photo) => {
  return axiosInstance.put(`/member/upload-foto/${memberId}`, photo, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const getMemberService = async (page = 1, search = "", status = "") => {
  return await axiosInstance.get(`/member?page=${page}&search=${search}&status=${status}`);
};

export const getDetailMemberService = async (username) => {
  return await axiosInstance.get(`/member/detail/${username}`);
};

export const getMyProfilService = async () => {
  return await axiosInstance.get(`/member/my-profil`);
};

export const deleteMemberService = (id) => {
  return axiosInstance.delete(`/member/${id}`);
};
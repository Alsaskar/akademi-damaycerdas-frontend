import axiosInstance from "@/utils/axiosInstance";

export const getMemberDashboardService = async () => {
  return await axiosInstance.get(`/dashboard/member`);
};

export const getAdminDashboardService = async () => {
  return await axiosInstance.get(`/dashboard/admin`);
};
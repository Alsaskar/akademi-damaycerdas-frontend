import axiosInstance from "@/utils/axiosInstance";

export const changePasswordService = async (payload) => {
    return await axiosInstance.put("/user/change-password", payload);
};

export const forgotPasswordService = async (email) => {
    return await axiosInstance.post("/user/forgot-password", { email });
};

export const resetPasswordService = async (payload) => {
    return await axiosInstance.post("/user/reset-password", payload);
};
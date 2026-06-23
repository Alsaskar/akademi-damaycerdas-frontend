import axiosInstance from "@/utils/axiosInstance";

export const createAttendanceService = async (payload) => {
    return await axiosInstance.post("/attendance", payload);
};

export const getAttendanceService = async (trainingSessionId) => {
    return await axiosInstance.get(`/attendance?trainingSessionId=${trainingSessionId}`);
};
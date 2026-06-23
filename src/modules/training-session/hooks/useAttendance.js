import { useState } from "react"
import { createAttendanceService, getAttendanceService } from "../services/attendanceService"

export const useAttendance = () => {
    const [loading, setLoading] = useState(false)

    const addAttendance = async (trainingSessionId) => {
        setLoading(true)

        try {
            const res = await createAttendanceService({trainingSessionId})

            return {
                success: true,
                data: res.data,
                message: res.data?.message
            }
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Terjadi kesalahan"
            }
        } finally {
            setLoading(false)
        }
    }

    const fetchAttendance = async (trainingSessionId) => {
        try {   
            const res = await getAttendanceService(trainingSessionId);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    };

    return {
        addAttendance,
        fetchAttendance,
        loading
    }
}
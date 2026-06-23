import { useState } from "react"
import { createMateriTrainingService, deleteMateriTrainingService, getMateriTrainingService } from "../services/materiService"

export const useMateriTraining = () => {
    const [loading, setLoading] = useState(false)

    const addMateriTraining = async (data) => {
        setLoading(true)

        try {
            const res = await createMateriTrainingService(data)

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

    const fetchMateriTraining = async (trainingSessionId) => {
        try {
            const res = await getMateriTrainingService(trainingSessionId);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const removeMateriTraining = async (id) => {
        setLoading(true);

        try {
            const res = await deleteMateriTrainingService(id);

            return {
                success: res.data.success,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal menghapus data"
            };
        } finally {
            setLoading(false);
        }
    }

    return {
        addMateriTraining,
        fetchMateriTraining,
        // editTraining,
        removeMateriTraining,
        // getDetailTraining,
        loading
    }
}
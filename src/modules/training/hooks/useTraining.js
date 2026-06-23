import { useState } from "react"
import { createTrainingService, deleteTrainingService, editTrainingService, getDetailTrainingService, getMyTrainingService, getParticipantsTrainingService, getTrainingService, joinMemberTrainingService, leaveParticipantTrainingService } from "../services/trainingService"

export const useTraining = () => {
    const [loading, setLoading] = useState(false)

    const addTraining = async (data) => {
        setLoading(true)

        try {
            const res = await createTrainingService(data)

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

    const fetchTraining = async (page, search, status) => {
        try {
            const res = await getTrainingService(page, search, status);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const getDetailTraining = async (slug) => {
        try {
            const res = await getDetailTrainingService(slug);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const getParticipants = async (trainingId, page, search) => {
        try {
            const res = await getParticipantsTrainingService(trainingId, page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editTraining = async (id, data) => {
        setLoading(true);

        try {
            const res = await editTrainingService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate kategori"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeTraining = async (id) => {
        setLoading(true);

        try {
            const res = await deleteTrainingService(id);

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

    const leaveParticipantTraining = async (trainingId, memberId) => {
        setLoading(true);

        try {
            const res = await leaveParticipantTrainingService(trainingId, memberId);

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

    const joinMemberTraining = async (data) => {
        setLoading(true)

        try {
            const res = await joinMemberTrainingService(data)

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

    const fetchMyTraining = async (page, search) => {
        try {
            const res = await getMyTrainingService(page, search);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    };

    return {
        addTraining,
        fetchTraining,
        editTraining,
        removeTraining,
        getDetailTraining,
        getParticipants,
        joinMemberTraining,
        leaveParticipantTraining,
        fetchMyTraining,
        loading
    }
}
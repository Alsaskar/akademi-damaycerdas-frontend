import { useState } from "react"
import { createSessionService, deleteSessionService, editSessionService, getDetailSessionService, getSessionService } from "../services/sessionService"

export const useSessionTraining = () => {
    const [loading, setLoading] = useState(false)

    const addSession = async (data) => {
        setLoading(true)

        try {
            const res = await createSessionService(data)

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

    const fetchSession = async (trainingId) => {
        try {
            const res = await getSessionService(trainingId);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const getDetailSession = async (slug) => {
        try {
            const res = await getDetailSessionService(slug);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editSession = async (id, data) => {
        setLoading(true);

        try {
            const res = await editSessionService(id, data);

            return {
                success: true,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengupdate data"
            };
        } finally {
            setLoading(false);
        }
    };

    const removeSession = async (id) => {
        setLoading(true);

        try {
            const res = await deleteSessionService(id);

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
        addSession,
        fetchSession,
        getDetailSession,
        editSession,
        removeSession,
        loading
    }
}
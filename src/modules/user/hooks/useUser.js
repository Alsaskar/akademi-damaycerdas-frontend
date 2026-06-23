import { useState } from "react";
import { changePasswordService, forgotPasswordService, resetPasswordService } from "../services/userServices";

export const useUser = () => {
    const [loading, setLoading] = useState(false);

    const changePassword = async (payload) => {
        setLoading(true);

        try {
            const res = await changePasswordService(payload);

            return {
                success: true,
                data: res.data,
                message: res.data.message
            };

        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Terjadi kesalahan"
            };

        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email) => {
        setLoading(true);

        try {
            const res = await forgotPasswordService(email);

            return {
                success: true,
                message: res.data.message
            };

        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal mengirim link reset password"
            };

        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (payload) => {
        setLoading(true);

        try {
            const res = await resetPasswordService(payload);

            return {
                success: true,
                message: res.data.message
            };

        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal reset password"
            };

        } finally {
            setLoading(false);
        }
    };

    return {
        changePassword,
        forgotPassword,
        resetPassword,
        loading
    };
};
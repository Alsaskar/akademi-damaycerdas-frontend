import { useState } from "react"
import { createMemberService, deleteMemberService, getDetailMemberService, getMemberService, getMyProfilService, uploadFotoProfilMemberService } from "../services/memberService"

export const useMember = () => {
    const [loading, setLoading] = useState(false)

    const addMember = async (data) => {
        setLoading(true)

        try {
            const res = await createMemberService(data)

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

    const fetchMember = async (page, search, status) => {
        try {
            const res = await getMemberService(page, search, status);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const fetchMyProfil = async () => {
        try {
            const res = await getMyProfilService();

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const getDetailMember = async (username) => {
        try {
            const res = await getDetailMemberService(username);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const removeMember = async (id) => {
        setLoading(true);

        try {
            const res = await deleteMemberService(id);

            return {
                success: res.data.success,
                message: res.data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Gagal menghapus"
            };
        } finally {
            setLoading(false);
        }
    }

    const uploadFotoProfil = async (id, photo) => {
        setLoading(true);

        try {
            const res = await uploadFotoProfilMemberService(id, photo);

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

    return {
        addMember,
        fetchMember,
        removeMember,
        getDetailMember,
        fetchMyProfil,
        uploadFotoProfil,
        loading
    }
}
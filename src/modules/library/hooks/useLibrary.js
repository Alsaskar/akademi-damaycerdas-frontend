import { useState } from "react"
import { createLibraryService, deleteLibraryService, editLibraryService, getDetailBySlugLibraryService, getDetailLibraryService, getLibraryService } from "../services/libraryService"

export const useLibrary = () => {
    const [loading, setLoading] = useState(false)

    const addLibrary = async (data) => {
        setLoading(true)

        try {
            const res = await createLibraryService(data)

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

    const fetchLibrary = async (page, search, status, category) => {
        try {
            const res = await getLibraryService(page, search, status, category);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const getDetailLibrary = async (id) => {
        try {
            const res = await getDetailLibraryService(id);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const getDetailBySlugLibrary = async (slug) => {
        try {
            const res = await getDetailBySlugLibraryService(slug);

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editLibrary = async (id, data) => {
        setLoading(true);

        try {
            const res = await editLibraryService(id, data);

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

    const removeLibrary = async (id) => {
        setLoading(true);

        try {
            const res = await deleteLibraryService(id);

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

    return {
        addLibrary,
        fetchLibrary,
        getDetailLibrary,
        editLibrary,
        removeLibrary,
        getDetailBySlugLibrary,
        loading
    }
}
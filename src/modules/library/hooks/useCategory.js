import { useState } from "react"
import { createLibraryCategoryService, deleteLibraryCategoryService, editLibraryCategoryService, getLibraryCategoryService } from "../services/categoryService"

export const useLibraryCategory = () => {
    const [loading, setLoading] = useState(false)

    const addLibraryCategory = async (data) => {
        setLoading(true)

        try {
            const res = await createLibraryCategoryService(data)

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

    const fetchLibraryCategory = async () => {
        try {
            const res = await getLibraryCategoryService();

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const editLibraryCategory = async (id, data) => {
        setLoading(true);

        try {
            const res = await editLibraryCategoryService(id, data);

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

    const removeLibraryCategory = async (id) => {
        setLoading(true);

        try {
            const res = await deleteLibraryCategoryService(id);

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
        addLibraryCategory,
        fetchLibraryCategory,
        editLibraryCategory,
        removeLibraryCategory,
        loading
    }
}
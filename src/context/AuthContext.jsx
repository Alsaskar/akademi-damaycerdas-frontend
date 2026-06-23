import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const refreshAuth = async () => {
        try {
            const res = await axiosInstance.get("/auth", { withCredentials: true });
            setUser(res.data.data.user);

            return res.data.data.user;
        } catch {
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAuth()
    }, []);

    const login = async (username, password) => {
        const res = await axiosInstance.post(
            "/auth/login",
            { username, password },
            { withCredentials: true } // penting biar cookie terset
        );

        const userData = res.data.data.user;
        setUser(userData)

        return userData;
    };

    // untuk sementara, agar loading nya cepat
    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setUser(null);
            window.location.href = "/"; // langsung redirect agar tidak stuck
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
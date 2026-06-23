import { useState } from "react"
import { getAdminDashboardService, getMemberDashboardService } from "../services/dashboardService"

export const useDashboard = () => {
    const [loading, setLoading] = useState(false)

    const fetchMemberDashboard = async () => {
        try {
            const res = await getMemberDashboardService()

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    const fetchAdminDashboard = async () => {
        try {
            const res = await getAdminDashboardService()

            return res.data;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    return {
        fetchMemberDashboard,
        fetchAdminDashboard,
        loading
    }
}
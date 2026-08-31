import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store"

export const ProtectedRoute = () => {
    const { usuario } = useUserStore();

    if(!usuario) {
        return <Navigate to="/" replace/>
    }

    return <Outlet />
}
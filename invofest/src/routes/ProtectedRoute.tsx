import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // Jika pengguna tidak terautentikasi, arahkan ke halaman login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    // Jika pengguna terautentikasi, render komponen anak (Outlet)
    return <Outlet />;
}
export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";

function AdminProtectedRoute({ children }) {

    const location = useLocation();

    const token = sessionStorage.getItem("token");

    const role = String(
        sessionStorage.getItem("role") || "USER"
    )
        .trim()
        .toUpperCase();

    if (!token) {

        sessionStorage.setItem(
            "redirectAfterLogin",
            location.pathname
        );

        return <Navigate to="/login" replace />;

    }

    if (role !== "ADMIN") {

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default AdminProtectedRoute;
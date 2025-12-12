import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

const AdminRoute = ({ children }) => {
    const { role, loading } = useRole();

    if (loading) return <LoadingSpinner></LoadingSpinner>;

    if (role !== "admin") return <Navigate to="/" replace />;

    return children;
};

export default AdminRoute;

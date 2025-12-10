// src/routes/PrivateRoute.jsx

import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <p>Loading...</p>;//to do add loading component

    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    return children;
};

export default PrivateRoute;

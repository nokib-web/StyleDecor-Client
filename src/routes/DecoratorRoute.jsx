import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DecoratorRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, loading: roleLoading } = useRole();
    const location = useLocation();

    if (authLoading || roleLoading) {
        return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (user && role === "decorator") {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default DecoratorRoute;

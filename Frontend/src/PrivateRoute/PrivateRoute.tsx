import { ReactNode, useContext } from "react";
import { AuthContext } from '../contects/AuthProvider';
import { useLocation, Navigate } from "react-router-dom";
import { AuthContextType } from "../interfaces/AuthContextType";

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useContext(AuthContext) as AuthContextType;
    const location = useLocation();

    if (loading) {
        return (
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (!user || user.email !== 'svlormanua@gmail.com') {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;

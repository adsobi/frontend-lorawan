import { Navigate } from "react-router-dom";
import useAuth from "../hooks/Auth";

const ProtectedRoute = ({children}: { children: JSX.Element }) => {
    const { token } = useAuth();

    if (token === null) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute;
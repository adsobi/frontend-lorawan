import React from "react";
import { AuthContext } from "../components/AuthProvider";

const useAuth = () => {
    return React.useContext(AuthContext);
}

export default useAuth;
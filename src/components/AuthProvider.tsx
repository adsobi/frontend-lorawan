import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import login from "../services/auth";

interface IContextProps {
    token: string|null,
    onLogin: (username: string, password: string) => Promise<void>,
    onLogout: () => void,
}
const AuthContext = React.createContext({} as IContextProps);

const AuthProvider = ({ children } : { children: React.ReactNode}) => {

    const [token, setToken] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setToken(localStorage.getItem('token'));
        }
    }, [])

    const onLogin = async (username: string, password: string) => {
        const responseToken = await login(username, password);
        setToken(responseToken);
        localStorage.setItem('token', responseToken);
    }
    const onLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    }

    const auth: IContextProps = {
        token, onLogin, onLogout
    };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext }
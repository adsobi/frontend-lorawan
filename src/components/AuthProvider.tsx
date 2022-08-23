import axios from "axios";
import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthHeader from "../services/auth-header";

interface IContextProps {
    token: string | null,
    onLogin: (username: string, password: string) => Promise<void>,
    onLogout: () => void,
}
const AuthContext = React.createContext({} as IContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [token, setToken] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setToken(localStorage.getItem('token'));
        }
    }, [])

    const onLogin = (email: string, password: string) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + "login", {
            email,
            password,
        })
            .then((response) => {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
            }, (reject) => {
                return Promise.reject(reject);
            });
    }
    const onLogout = () => {
        return axios.delete(process.env.REACT_APP_BACKEND_URL + "logout", { headers: AuthHeader() })
            .then((response) => {
                setToken(null);
                localStorage.removeItem('token');
                navigate('/login');
            }).catch((error) => {
                setToken(null);
                localStorage.removeItem('token');
            });
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
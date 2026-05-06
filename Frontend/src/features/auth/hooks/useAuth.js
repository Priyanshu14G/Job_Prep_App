import { useContext } from "react";
import AuthContext from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";
import { useEffect } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, loading, setUser, setLoading } = context;

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
                setLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, []);

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () => {
        setLoading(true);
        try {
            const response = await getMe();
            setUser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    


    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe
    }
}
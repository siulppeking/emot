import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, logout, verificarLogin } from "../store/auth/authSlice";
import { v1PrivateApi } from "../api/v1Private.api";
import { finCargando, inicioCargando } from "../store/ui/ui.slice";

export const useCheckUser = () => {
    const dispatch = useDispatch();
    const { cargando } = useSelector(state => state.ui);

    useEffect(() => {
        const getVerificarLogin = async () => {
            dispatch(inicioCargando());
            dispatch(verificarLogin());

            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(logout());
                dispatch(finCargando());
                return;
            }
            try {
                const response = await v1PrivateApi.get('/auth/verificar');
                const { nombreUsuario, correo, fotoURL } = response.data.datos;
                dispatch(login({ nombreUsuario, correo, fotoURL }));
            } catch (error) {
                console.log(error.message);
                dispatch(logout());
                localStorage.removeItem('correo');
                localStorage.removeItem('token');
            } finally {
                dispatch(finCargando());
            }
        }
        getVerificarLogin();
    }, [])

    return {
        cargando
    }
}
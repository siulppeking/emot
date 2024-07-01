import { useDispatch, useSelector } from "react-redux";
import { checkingCredentials, login, logout } from "../store/auth/authSlice";
import { useEffect } from "react";
import axios from "axios";

export const useCheckUser = () => {
    const { status, checking } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLogin = async () => {
            dispatch(checkingCredentials())
            const token = localStorage.getItem('token');
            if (token !== null) {
                try {
                    const response = await axios({
                        url: `${import.meta.env.VITE_BASEAPI_EMOT}/api/v1/auth/verificar`,
                        method: 'GET',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        }
                    })
                    const { nombreUsuario, correo, fotoURL } = response.data.datos;
                    dispatch(login({ nombreUsuario, correo, fotoURL }))
                } catch (error) {
                    dispatch(logout({ errorMessage: null }))
                    localStorage.removeItem('correo');
                    localStorage.removeItem('token');
                }
            } else {
                dispatch(logout({ errorMessage: null }))
            }
        }
        checkLogin();
    }, [])

    return {
        status,
        checking
    }
}
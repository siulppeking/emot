import { useDispatch, useSelector } from "react-redux"
import { agregarError, agregarErrores, limpiarErrores, login } from "../store/auth/authSlice";
import { v1PublicApi } from "../api/v1Public.api";
import { finCargando, inicioCargando } from "../store/ui/ui.slice";

export const useAuthStore = () => {

    const dispatch = useDispatch();

    const { error, errores, status } = useSelector(state => state.auth);
    const { cargando } = useSelector(state => state.ui);

    const fnLogin = async (correoIn, claveIn) => {
        try {
            dispatch(inicioCargando());
            const data = { correo: correoIn, clave: claveIn }
            const response = await v1PublicApi.post('/auth/login', data);

            const { nombreUsuario, correo, token, fotoURL } = response.data.datos;
            localStorage.setItem('token', token);
            dispatch(login({ userId, nombreUsuario, correo, fotoURL }));
        } catch (error) {
            console.log(error.message);
            if (error.response.data.respuesta === 'ERROR') {
                dispatch(agregarError({ error: error.response.data.mensaje }))
            } else if (error.response.data.respuesta === 'ERRORES') {
                dispatch(agregarErrores({ errores: error.response.data.datos.errores }))
            }
        } finally {
            dispatch(finCargando());
        }
    }

    const fnLimpiarErrores = () => {
        dispatch(limpiarErrores())
    }

    return {
        fnLogin,
        fnLimpiarErrores,
        status,
        cargando,
        error,
        errores
    }
}
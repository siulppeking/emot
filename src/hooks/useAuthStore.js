import { useDispatch, useSelector } from "react-redux"
import { agregarError, agregarErrores, iniciarEjecucion, limpiarErrores, login, terminarEjecucion } from "../store/auth/authSlice";
import { v1PublicApi } from "../api/v1Public.api";

export const useAuthStore = () => {

    const { status, checking, error, errores } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const fnLogin = async (correoIn, claveIn) => {
        try {
            dispatch(iniciarEjecucion());
            const response2 = await v1PublicApi.post('/auth/login', {
                correo: correoIn,
                clave: claveIn
            });
            const { nombreUsuario, correo, token } = response2.data.datos;
            localStorage.setItem('token', token);
            dispatch(login({ nombreUsuario, correo }))
        } catch (error) {
            console.log(error);
            if (error.response.data.respuesta === 'ERROR') {
                dispatch(agregarError({ error: error.response.data.mensaje }))
            } else if (error.response.data.respuesta === 'ERRORES') {
                dispatch(agregarErrores({ errores: error.response.data.datos.errores }))
            }
        } finally {
            dispatch(terminarEjecucion())
        }
    }

    const fnLimpiarErrores = () => {
        dispatch(limpiarErrores())
    }

    return {
        fnLogin,
        fnLimpiarErrores,
        status,
        checking,
        error,
        errores
    }
}
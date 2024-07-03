import axios from "axios"
import { agregarError, agregarErrores, login, logout } from "./authSlice"

export const authCheckingCredentialsGoogle = (googleToken) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_BASEAPI_EMOT}/api/v1/auth/login/google`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { googleToken }
            })
            const { nombreUsuario, correo, token, fotoURL } = response.data.datos;
            localStorage.setItem('token', token);
            localStorage.setItem('correo', correo);
            dispatch(login({ nombreUsuario, correo, fotoURL }))
        } catch (error) {
            let cadena = ''
            if (error.response.data.status === 'VALIDATION_ERRORS') {
                error.response.data.data.errors.map(err => {
                    cadena += err.msg + ', ';
                })
            } else {
                cadena = error.response.data.data.message;
            }
            dispatch(logout({ errorMessage: cadena }))
        }
    }
}
export const authCheckingCredentialsRegister = (correoIn, claveIn) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_BASEAPI_EMOT}/api/v1/auth/registro`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { correo: correoIn, clave: claveIn }
            })

            const { nombreUsuario, correo, token } = response.data.datos;
            localStorage.setItem('token', token);
            dispatch(login({ nombreUsuario, correo }))
        } catch (error) {
            console.log(error.message);
            if (error.response.data.respuesta === 'ERROR') {
                dispatch(agregarError({ error: error.response.data.mensaje }))
            } else if (error.response.data.respuesta === 'ERRORES') {
                dispatch(agregarErrores({ errores: error.response.data.datos.errores }))
            }
        } finally {
            dispatch(terminarEjecucion())
        }
    }
}
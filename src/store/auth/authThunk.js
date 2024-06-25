import axios from "axios"
import { agregarError, agregarErrores, checkingCredentials, iniciarEjecucion, login, logout, terminarEjecucion } from "./authSlice"

export const authCheckingCredentials = (correoIn, claveIn) => {
    return async (dispatch) => {
        try {
            dispatch(iniciarEjecucion());
            const response = await axios({
                url: `${import.meta.env.VITE_RESTAPI_SEGURIDAD}/api/v1/auth/login`,
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
}

export const authCheckingCredentialsGoogle = (googleToken) => {
    return async (dispatch) => {
        try {
            dispatch(checkingCredentials())
            const response = await axios({
                url: `${import.meta.env.VITE_RESTAPI_SEGURIDAD}/api/v1/auth/login/google`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { googleToken }
            })
            const { nombreUsuario, correo, token } = response.data.datos;
            localStorage.setItem('token', token);
            localStorage.setItem('correo', correo);
            dispatch(login({ nombreUsuario, correo }))
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
            dispatch(iniciarEjecucion());
            const response = await axios({
                url: `${import.meta.env.VITE_RESTAPI_SEGURIDAD}/api/v1/auth/registro`,
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
}
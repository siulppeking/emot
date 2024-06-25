import axios from "axios";
import { agregarError, iniciarEjecucion, obtenerProductos, terminarEjecucion } from "./productoSlice"

export const thunkObtenerProductos = () => {
    return async (dispatch) => {
        try {
            //dispatch(ejecutando())
            dispatch(iniciarEjecucion());
            const respuesta = await axios({
                url: `${import.meta.env.VITE_RESTAPI_SEGURIDAD}/api/v1/products`,
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
            dispatch(obtenerProductos(respuesta.data.data.results))
        } catch (error) {
            console.log(error);
            dispatch(agregarError({ error: error.message }))
        } finally {
            dispatch(terminarEjecucion())
        }
    }
}
import axios from "axios";
import { agregarError, iniciarEjecucion, obtenerCategorias, terminarEjecucion } from "./categoriaSlice"

export const thunkObtenerCategorias = () => {
    //const navigate = useNavigate();

    return async (dispatch) => {
        try {
            dispatch(iniciarEjecucion())
            const respuesta = await axios({
                url: `${import.meta.env.VITE_RESTAPI_SEGURIDAD}/api/v1/categories`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            })
            dispatch(obtenerCategorias(respuesta.data.data))
        } catch (error) {
            console.log(error);
            dispatch(agregarError({ error: error.message }))
        } finally {
            dispatch(terminarEjecucion())
        }
    }
}
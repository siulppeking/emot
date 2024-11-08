import { useDispatch, useSelector } from "react-redux";
import { v1PrivateApi } from "../api/v1Private.api";
import { agregarComunidad, iniciarCarga, obtenerComunidades, terminarCarga } from "../store/comunidad/comunidad.slice";

export const useComunidadStore = () => {

    const dispatch = useDispatch();

    const { comunidades, cargando } = useSelector(state => state.comunidad);

    const fnObtenerComunidades = async () => {
        try {
            dispatch(iniciarCarga());
            const response = await v1PrivateApi.get('/comunidades');
            dispatch(obtenerComunidades(response.data.datos))
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(terminarCarga());
        }
    }

    const fnCrearComunidad = async (titulo, descripcion, categoria) => {
        try {
            dispatch(iniciarCarga());
            const response = await v1PrivateApi.post('/comunidades', {
                titulo,
                descripcion,
                categoria
            });
            dispatch(agregarComunidad(response.data.datos))
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(terminarCarga());
        }
    }


    return {
        fnObtenerComunidades,
        fnCrearComunidad,
        cargando,
        comunidades
    }
}
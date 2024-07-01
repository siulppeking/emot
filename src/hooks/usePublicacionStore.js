import { useDispatch, useSelector } from "react-redux";
import { iniciarEjecucion, terminarEjecucion } from "../store/ui/ui.slice";
import { v1PrivateApi } from "../api/v1Private.api";
import { agregarPublicacion, obtenerPublicacions } from "../store/publicacion/publicacion.slice";

export const usePublicacionStore = () => {

    const { publicaciones } = useSelector(state => state.publicacion);

    const dispatch = useDispatch();

    const fnObtenerPublicaciones = async () => {
        try {
            dispatch(iniciarEjecucion())
            const response = await v1PrivateApi.get('/publicacion');
            dispatch(obtenerPublicacions(response.data.datos))
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(terminarEjecucion())
        }
    }

    const fnCrearPublicacion = async (titulo, descripcion) => {
        try {
            dispatch(iniciarEjecucion())
            const response = await v1PrivateApi.post('/publicacion', {
                titulo,
                descripcion
            });
            console.log(response.data.datos);
            dispatch(agregarPublicacion(response.data.datos))
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(terminarEjecucion())
        }
    }

    return {
        fnObtenerPublicaciones,
        fnCrearPublicacion,
        publicaciones
    }
}
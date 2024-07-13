import { useDispatch, useSelector } from "react-redux";
import { v1PrivateApi } from "../api/v1Private.api";
import { agregarComentario, agregarPublicacion, agregarSubComentario, cambiarReaccion, iniciarCarga, obtenerPublicacions, terminarCarga } from "../store/publicacion/publicacion.slice";

export const usePublicacionStore = () => {

    const dispatch = useDispatch();

    const { publicaciones, cargando } = useSelector(state => state.publicacion);

    const fnObtenerPublicaciones = async () => {
        try {
            dispatch(iniciarCarga());
            const response = await v1PrivateApi.get('/publicaciones');
            dispatch(obtenerPublicacions(response.data.datos))
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(terminarCarga());
        }
    }

    const fnCrearPublicacion = async (titulo, descripcion) => {
        try {
            dispatch(iniciarCarga());
            const response = await v1PrivateApi.post('/publicaciones', {
                titulo,
                descripcion
            });
            dispatch(agregarPublicacion(response.data.datos))
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(terminarCarga());
        }
    }

    const fnCambiarReaccionPublicacion = async (publicacionId) => {
        try {
            //dispatch(iniciarCarga());
            const response = await v1PrivateApi.get('/publicaciones/cambiarReaccion/' + publicacionId);
            dispatch(cambiarReaccion(response.data.datos))
        } catch (error) {
            console.log(error.message);
        } finally {
            //dispatch(terminarCarga());
        }
    }

    const fnAgregarComentario = async (comentario) => {
        dispatch(agregarComentario(comentario))
    }

    const fnAgregarSubComentario = async (subComentario) => {
        dispatch(agregarSubComentario(subComentario))

    }

    return {
        cargando,
        fnObtenerPublicaciones,
        fnCrearPublicacion,
        fnCambiarReaccionPublicacion,
        fnAgregarComentario,
        fnAgregarSubComentario,
        publicaciones
    }
}
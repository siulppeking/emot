import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'publicacion',
    //declaracion del estado inicial de las variables
    initialState: {
        cargando: false,
        publicaciones: []
    },
    //funciones que modifican el estado
    reducers: {
        obtenerPublicacions: (state, action) => {
            state.publicaciones = action.payload
        },
        agregarPublicacion: (state, action) => {
            state.publicaciones = [action.payload, ...state.publicaciones]
        },
        cambiarReaccion: (state, { payload }) => {
            const index = state.publicaciones.findIndex(p => p.publicacionId === payload.publicacionId);
            if (index >= 0) {
                const publicacion = { ...state.publicaciones[index] };
                publicacion.reacciones = payload.reacciones;
                publicacion.reaccionado = payload.reaccionado;
                state.publicaciones[index] = publicacion;
            }
        },
        agregarComentario: (state, { payload }) => {
            state.publicaciones = state.publicaciones.map(publicacion =>
                publicacion.publicacionId === payload.publicacionId
                    ? {
                        ...publicacion,
                        comentarios: [payload, ...publicacion.comentarios],
                    }
                    : publicacion
            )
        },
        agregarSubComentario: (state, { payload }) => {
            state.publicaciones = state.publicaciones.map(publicacion =>
                publicacion.publicacionId === payload.publicacionId
                    ? {
                        ...publicacion,
                        comentarios: publicacion.comentarios.map(comentario =>
                            comentario.comentarioId === payload.subComentarioId
                                ? {
                                    ...comentario,
                                    subComentarios: [payload, ...comentario.subComentarios],
                                }
                                : comentario
                        ),
                    }
                    : publicacion
            )
        },
        iniciarCarga: (state) => {
            state.cargando = true
        },
        terminarCarga: (state) => {
            state.cargando = false
        }
    },
});

export const {
    obtenerPublicacions,
    agregarPublicacion,
    cambiarReaccion,
    agregarComentario,
    agregarSubComentario,
    iniciarCarga,
    terminarCarga
} = publicacionSlice.actions;

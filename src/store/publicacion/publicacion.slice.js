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
    iniciarCarga,
    terminarCarga
} = publicacionSlice.actions;

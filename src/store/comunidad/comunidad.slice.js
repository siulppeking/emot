import { createSlice } from '@reduxjs/toolkit';

export const comunidadSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'comunidad',
    //declaracion del estado inicial de las variables
    initialState: {
        cargando: false,
        comunidades: []
    },
    //funciones que modifican el estado
    reducers: {
        obtenerComunidades: (state, action) => {
            state.comunidades = action.payload
        },
        agregarComunidad: (state, action) => {
            state.comunidades = [action.payload, ...state.comunidades]
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
    obtenerComunidades,
    agregarComunidad,
    iniciarCarga,
    terminarCarga
} = comunidadSlice.actions;

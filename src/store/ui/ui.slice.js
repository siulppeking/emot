import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'publicacion',
    //declaracion del estado inicial de las variables
    initialState: {
        ejecutandoTransaccion: false,
        error: null,
        errores: null
    },
    //funciones que modifican el estado
    reducers: {
        iniciarEjecucion: (state) => {
            state.ejecutandoTransaccion = true;
        },
        terminarEjecucion: (state) => {
            state.ejecutandoTransaccion = false;
        },
        agregarError: (state, { payload }) => {
            state.error = payload.error;
        },
        agregarErrores: (state, { payload }) => {
            state.errores = payload.errores
        }
    },
});

export const {
    iniciarEjecucion,
    terminarEjecucion,
    agregarError,
    agregarErrores
} = uiSlice.actions;

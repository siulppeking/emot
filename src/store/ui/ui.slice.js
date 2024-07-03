import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'ui',
    //declaracion del estado inicial de las variables
    initialState: {
        cargando: true,
        error: null,
        errores: null
    },
    //funciones que modifican el estado
    reducers: {
        inicioCargando: (state) => {
            state.cargando = true;
        },
        finCargando: (state) => {
            state.cargando = false;
        },
        agregarError: (state, action) => {
            state.error = action.payload.error;
        },
        agregarErrores: (state, action) => {
            state.errores = action.payload.errores
        }
    },
});

export const {
    inicioCargando,
    finCargando,
    agregarError,
    agregarErrores
} = uiSlice.actions;

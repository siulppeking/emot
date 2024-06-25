import { createSlice } from '@reduxjs/toolkit';

export const categoriaSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'categoria',
    //declaracion del estado inicial de las variables
    initialState: {
        ejecutandoTransaccion: false,
        mensajeError: null,
        mensajeTransaccion: null,
        categorias: []
    },
    //funciones que modifican el estado
    reducers: {
        ejecutando: (state) => {
            state.ejecutandoTransaccion = true;
        },
        iniciarEjecucion: (state) => {
            state.ejecutandoTransaccion = true;
        },
        terminarEjecucion: (state) => {
            state.ejecutandoTransaccion = false;
        },
        agregarError: (state, { payload }) => {
            state.mensajeError = payload.error
        },
        obtenerCategorias: (state, { payload }) => {
            state.categorias = payload
        },
        agregarCategoria: (state, action) => {

        },
        obtenerCategoriaPorId: (state, action) => {

        },
        actualizarCategoria: (state, action) => {

        },
        eliminarCategoria: (state, action) => {

        }
    },
});

export const {
    ejecutando,
    iniciarEjecucion,
    terminarEjecucion,
    agregarError,
    obtenerCategorias,
    agregarCategoria,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
} = categoriaSlice.actions;

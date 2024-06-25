import { createSlice } from '@reduxjs/toolkit';

export const productoSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'producto',
    //declaracion del estado inicial de las variables
    initialState: {
        ejecutandoTransaccion: false,
        mensajeError: null,
        mensajeTransaccion: null,
        productos: []
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
        obtenerProductos: (state, { payload }) => {
            state.productos = payload
            state.ejecutandoTransaccion = false
        },
        agregarProducto: (state, action) => {

        },
        obtenerProductoPorId: (state, action) => {

        },
        actualizarProducto: (state, action) => {

        },
        eliminarProducto: (state, action) => {

        }
    },
});

export const {
    ejecutando,
    iniciarEjecucion,
    terminarEjecucion,
    agregarError,
    obtenerProductos,
    agregarProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
} = productoSlice.actions;

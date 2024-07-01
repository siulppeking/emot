import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'auth',
    //declaracion del estado inicial de las variables
    initialState: {
        status: 'no-authenticated', // 'authenticated' 'no-authenticated' 
        checking: false,
        nombreUsuario: null,
        correo: null,
        fotoURL: null,
        error: null,
        errores: null,
        mensajeError: null,
    },
    //funciones que modifican el estado
    reducers: {
        iniciarEjecucion: (state) => {
            state.checking = true;
            state.error = null;
            state.errores = null;
        },
        terminarEjecucion: (state) => {
            state.checking = false;
        },
        login: (state, { payload }) => {
            state.status = 'authenticated'
            state.nombreUsuario = payload.nombreUsuario
            state.correo = payload.correo
            state.fotoURL = payload.fotoURL;
            state.errorMessage = null
            state.checking = false
        },
        logout: (state, { payload }) => {
            state.status = 'no-authenticated'
            state.checking = false
            state.nombreUsuario = null
            state.correo = null
            state.errorMessage = payload.errorMessage
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
            state.checking = true;
        },
        agregarError: (state, { payload }) => {
            state.error = payload.error;
        },
        agregarErrores: (state, { payload }) => {
            state.errores = payload.errores
        },
        limpiarErrores: (state) => {
            state.error = null;
            state.errores = null;
        }
    },
});

export const {
    iniciarEjecucion,
    terminarEjecucion,
    login,
    logout,
    checkingCredentials,
    agregarError,
    agregarErrores,
    limpiarErrores
} = authSlice.actions;
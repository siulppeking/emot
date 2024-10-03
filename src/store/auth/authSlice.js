import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'auth',
    //declaracion del estado inicial de las variables
    initialState: {
        status: 'no-authenticated', // 'authenticated' 'no-authenticated' 
        userId: null,
        nombreUsuario: null,
        correo: null,
        fotoURL: null,
        error: null,
        errores: null,
        mensajeError: null,
    },
    //funciones que modifican el estado
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.userId = payload.userId;
            state.nombreUsuario = payload.nombreUsuario;
            state.correo = payload.correo;
            state.fotoURL = payload.fotoURL;
        },
        logout: (state, { payload }) => {
            state.status = 'no-authenticated'
            state.userId = null
            state.nombreUsuario = null
            state.correo = null
            state.fotoURL = null;
        },
        verificarLogin: (state, action) => {
            state.status = 'no-authenticated'
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
    }
});

export const {
    login,
    logout,
    verificarLogin,
    agregarError,
    agregarErrores,
    limpiarErrores
} = authSlice.actions;
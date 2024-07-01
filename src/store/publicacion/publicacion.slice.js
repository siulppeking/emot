import { createSlice } from '@reduxjs/toolkit';

export const publicacionSlice = createSlice({
    //nombre del slice con el que se vincula al store
    name: 'publicacion',
    //declaracion del estado inicial de las variables
    initialState: {
        publicaciones: []
    },
    //funciones que modifican el estado
    reducers: {
        obtenerPublicacions: (state, { payload }) => {
            state.publicaciones = payload
        },
        agregarPublicacion: (state, { payload }) => {
            state.publicaciones = [payload, ...state.publicaciones]
        }
    },
});

export const {
    obtenerPublicacions,
    agregarPublicacion
} = publicacionSlice.actions;

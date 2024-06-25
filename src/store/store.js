import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { categoriaSlice } from './categoria/categoriaSlice'
import { productoSlice } from './productos/productoSlice'

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        categoria: categoriaSlice.reducer,
        producto: productoSlice.reducer
    },
})
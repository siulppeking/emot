import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './ui/ui.slice'
import { authSlice } from './auth/authSlice'
import { publicacionSlice } from './publicacion/publicacion.slice'

export default configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        publicacion: publicacionSlice.reducer,
    }
})
// src/components/BotonLogoutGoogle.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { finCargando, inicioCargando } from '../store/ui/ui.slice';

const BotonLogoutGoogle = () => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(inicioCargando());
        if (!localStorage.getItem('correo')) {
            localStorage.removeItem('token');
            dispatch(logout());
            dispatch(finCargando());
            return;
        }

        google.accounts.id.disableAutoSelect();
        // Puedes manejar el estado del usuario aquí o en otra parte de tu aplicación
        google.accounts.id.revoke(localStorage.getItem('correo'), done => {
            localStorage.removeItem('correo');
            localStorage.removeItem('token');
            dispatch(logout());
            dispatch(finCargando());
        })
    }

    return (
        <button type='button' className='btn btn-danger my-2 my-sm-0' onClick={handleSignOut}>
            <i className='bx bx-log-out'></i> Salir
        </button>
    );
};

export default BotonLogoutGoogle;

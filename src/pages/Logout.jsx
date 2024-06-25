// src/components/Logout.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/authSlice';

const Logout = () => {

    const dispatch = useDispatch();

    const handleSignOut = () => {
        google.accounts.id.disableAutoSelect();

        google.accounts.id.revoke(localStorage.getItem('correo'), done => {
            localStorage.removeItem('correo');
            localStorage.removeItem('token');
            dispatch(logout({ errorMessage: null }))
        });
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '689646443064-6l1t64a9dlqq8nbde5b9sih74qfgff32.apps.googleusercontent.com'
        });
        google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { theme: 'outline', size: 'large' }
        );
    }, []);

    return (
        <button className='btn btn-danger' onClick={handleSignOut}>
            Salir
        </button>
    );
};

export default Logout;

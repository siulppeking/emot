// src/components/BotonLoginGoogle.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authCheckingCredentialsGoogle } from '../store/auth/authThunk';

const BotonLoginGoogle = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id: '689646443064-6l1t64a9dlqq8nbde5b9sih74qfgff32.apps.googleusercontent.com',
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById('googleSignInButton'),
                { theme: 'outline', size: 'large' }
            );
        };

        const handleCredentialResponse = (response) => {
            // Puedes manejar el estado del usuario aquí o en otra parte de tu aplicación
            dispatch(authCheckingCredentialsGoogle(response.credential))
        };

        // Ensure the script is loaded before initializing
        if (window.google) {
            initializeGoogleSignIn();
        } else {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleSignIn;
            document.head.appendChild(script);
        }
    }, []);

    return <div id="googleSignInButton"></div>;
};

export default BotonLoginGoogle;

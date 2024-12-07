// src/components/Login.js
import React from 'react';
import { auth, provider, signInWithPopup } from '../firebase-config';
import './Login.css';

function Login({ onLogin }) {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            onLogin(); // Notify parent component about successful login
        } catch (error) {
            console.error("Error during sign in: ", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to ChatBot</h2>
            <button onClick={handleLogin} className="login-button">
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;

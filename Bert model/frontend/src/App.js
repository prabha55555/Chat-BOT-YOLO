// src/App.js
import React, { useState, useEffect } from 'react';
import ChatBot from './components/ChatBot';
import Login from './components/Login';
import { auth } from './firebase-config';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    const handleLogin = () => {
        setUser(auth.currentUser);
    };

    const handleLogout = () => {
        auth.signOut();
        setUser(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to the AI ChatBot</h1>
                {user && <button onClick={handleLogout} className="logout-button">Logout</button>}
            </header>
            <main>
                {user ? <ChatBot /> : <Login onLogin={handleLogin} />}
            </main>
        </div>
    );
}

export default App;

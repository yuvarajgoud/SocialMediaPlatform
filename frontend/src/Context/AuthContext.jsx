// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, isAuthenticated: false });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ token, isAuthenticated: true });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

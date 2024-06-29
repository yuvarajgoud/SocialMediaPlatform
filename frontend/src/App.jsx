
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'
import LoginPage from './Components/LoginPages/LoginPage';
import HomePage from './Components/HomePages/HomePage';
import SignupPage from './Components/LoginPages/SignupPage';
import Create from './Components/HomePages/Create'
import ProtectedRoutes from './Components/HomePages/ProtectedRoutes';
import Profile from './Components/HomePages/Profile';
const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="/protected" element={<ProtectedRoutes/>}>
                    <Route index element={<div>Hello</div>} />
                    <Route path="home" element={<HomePage/>}/>
                    <Route path="create" element={<Create/>} />
                    <Route path="profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;

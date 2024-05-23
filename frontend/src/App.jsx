import React, { useEffect } from "react";
import "./Styles/styles.css"
import Login from "./Components/LoginPages/Login";
import Signup from "./Components/LoginPages/Signup";
import Layout from "./Components/LoginPages/Layout";

import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from './Context/UserContext'
import { useContext ,useState} from "react";
import { UserContext } from "./Context/UserContext";
import HomeLayout from "./Components/HomePages/HomeLayout";
import { Navigate } from "react-router-dom";

function App() {

  const {userInfo , setUserInfo} = useContext(UserContext)

  

  return (
    <>
      <div className="App">
        <UserContextProvider>
          <Routes>
            <Route path='/' element = {<Layout/>}>
              <Route path={'/'} element = {<Login/>} />
              <Route path={'/signup'} element = {<Signup />} />
              <Route path = {'/home'} element={<HomeLayout/>}/>
            </Route>
          </Routes>
        </UserContextProvider>
      </div>
    </>
  )
}

export default App

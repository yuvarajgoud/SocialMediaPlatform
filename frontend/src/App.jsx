import React from "react";
import "./Styles/styles.css"
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Layout from "./Components/Layout";
import Error from "./Components/Error";
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element = {<Layout/>}>
            <Route path={'/'} element = {<Login/>} />
            <Route path={'/signup'} element = {<Signup />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App

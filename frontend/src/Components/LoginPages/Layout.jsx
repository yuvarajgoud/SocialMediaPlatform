import { Navigate, Outlet } from "react-router-dom";
import Header from '../HomePages/Header'
import { useEffect,useState } from "react";
export default function Layout(){
  
  return(
    <main>
      <Outlet/>
    </main>
  )
}
import { Outlet } from "react-router-dom";
import Header from './HomePages/Header'
export default function Layout(){

  
  return(
    <main>
      <Outlet/>
    </main>
  )
}
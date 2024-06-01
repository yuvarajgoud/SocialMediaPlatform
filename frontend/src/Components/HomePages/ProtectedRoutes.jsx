import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes(){

  const {auth,setAuth} = useContext(AuthContext)

  if(!auth.isAuthenticated){
    return (
      <Navigate to={'/'}/>
    )
  }

  return (
    <Outlet/>
  )
}
import { Navigate, Outlet } from "react-router-dom";
import React from 'react'

const PrivateRoutes = () => {
  return (
    JSON.parse(localStorage.getItem('Token')) ? <Outlet /> : <Navigate to="/signUpAndSignIn" />
  )
}

export default PrivateRoutes
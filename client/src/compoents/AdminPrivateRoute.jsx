import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function AdminPrivateRoute() {
    const {currentuser} = useSelector(state=>state.user) 
  return currentuser && currentuser.isadmin ?  <Outlet/> : <Navigate to='/signin'/> 
}

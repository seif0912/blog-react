import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRouteLogin = () => {
    const {currentUser} = useAuth();
        return (
        !currentUser? <Outlet/> : <Navigate to='/'/>
        ) 
}

export default PrivateRouteLogin 
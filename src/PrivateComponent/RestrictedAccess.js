import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const RestrictedAccess = () => {
    const auth = localStorage.getItem("token")
    return auth ? <Outlet/>:<Navigate to="/"/>
}
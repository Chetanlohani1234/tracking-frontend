import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const RestrictedAccess = () => {
    const auth = localStorage.getItem("Role")
    return auth ? <Outlet/>:<Navigate to="/"/>
}
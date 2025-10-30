import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../services/authService";

export default function PublicRoute({children}) {
    const isAuth = isAuthenticated();
    const role = getUserRole();

    if (isAuth) {
        if (role === 'ADMIN') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/users/home" replace />;
    }
    
    return children;
}
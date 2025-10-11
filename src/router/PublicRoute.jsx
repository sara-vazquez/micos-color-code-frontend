import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

export default function PublicRoute({children}) {
    const isAuth = isAuthenticated();

    if (isAuth) {
        // If it's already authenticated, returns home -> this helps logged users to aboid login/signup pages
        return <Navigate to="/home" replace />;
    }
    return children;
}
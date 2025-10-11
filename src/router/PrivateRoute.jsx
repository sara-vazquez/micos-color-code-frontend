import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

export default function PrivateRoute({ children }) {
    const isAuth = isAuthenticated();

    if (!isAuth) {
        //if it's not authenticated, returns to login page -> protect private routes
        return <Navigate to="/login" replace />;
    }

    return children;
}
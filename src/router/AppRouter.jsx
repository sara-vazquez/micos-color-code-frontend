import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";

import ProfilePage from "../pages/profilePage/ProfilePage";
import HomePage from "../pages/homePage/HomePage";
import DaltonismPage from "../pages/daltonismPage/DaltonismPage";
import SystemPage from "../pages/systemPage/SystemPage";

export default function AppRouter() {
    return(
        <Routes>
            {/* Public routes (authentication routes) */}
            <Route path="/login" 
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>} 
            />
            <Route path="/register" 
                element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>} 
            />
            {/* Private routes (need to be logged) */}
            <Route path="/home" 
                element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>} 
            />
            <Route path="/system" 
                element={
                    <PrivateRoute>
                        <SystemPage />
                    </PrivateRoute>} 
            />
            <Route  path="/daltonism" 
                element={
                    <PrivateRoute>
                        <DaltonismPage />
                    </PrivateRoute>} 
            />
            <Route path="/profile" 
                element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>} 
            />
            {/* 404 Route - If it's not logged goes to login, if it's logged goes to home page */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
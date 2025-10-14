import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../components/mainLayout/MainLayout";

import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";

import ProfilePage from "../pages/profilePage/ProfilePage";
import HomePage from "../pages/homePage/HomePage";
import DaltonismPage from "../pages/daltonismPage/DaltonismPage";
import SystemPage from "../pages/systemPage/SystemPage";
import ResourcesPage from "../pages/resourcesPage/ResourcesPage";

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
                        <MainLayout>
                            <HomePage backgroundColor="var(--white)"/>
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route path="/system" 
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <SystemPage backgroundColor="var(--white)"/>
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route  path="/daltonism" 
                element={
                    <PrivateRoute>
                        <MainLayout backgroundColor="var(--light-yellow)">
                            <DaltonismPage />
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route  path="/resources" 
                element={
                    <PrivateRoute>
                        <MainLayout backgroundColor="var(--secondary-100)">
                            <ResourcesPage />
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route path="/profile" 
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <ProfilePage backgroundColor="var(--yellow)"/>
                        </MainLayout>
                    </PrivateRoute>} 
            />
            {/* 404 Route - If it's not logged goes to login, if it's logged goes to home page */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
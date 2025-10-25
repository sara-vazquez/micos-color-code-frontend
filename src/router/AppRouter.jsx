import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../components/mainLayout/MainLayout";
import MainAdminLayout from "../components/mainAdminLayout/MainAdminLayout";

import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";

import DashboardPage from "../pages/dashboardPage/DashboardPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import HomePage from "../pages/homePage/HomePage";
import DaltonismPage from "../pages/daltonismPage/DaltonismPage";
import SystemPage from "../pages/systemPage/SystemPage";
import LetsPlayPage from "../pages/letsPlayPage/LetsPlayPage";
import MemoryCardsGamePage from "../pages/memoryCardsGamePage/MemoryCardsGamePage";
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

            {/* ADMIN ROUTE */}
            <Route path="/admin/dashboard"
                element={
                    <PrivateRoute>
                        <MainAdminLayout backgroundColor="var(--light-yellow)">
                            <DashboardPage />
                        </MainAdminLayout>
                    </PrivateRoute>}
            />

            {/* USER ROUTES */}
            <Route path="/users/home" 
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <HomePage backgroundColor="var(--white)"/>
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route path="/users/system" 
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <SystemPage backgroundColor="var(--white)"/>
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route  path="/users/daltonism" 
                element={
                    <PrivateRoute>
                        <MainLayout backgroundColor="var(--yellow)">
                            <DaltonismPage />
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route  path="/users/play" 
                element={
                    <PrivateRoute>
                        <MainLayout backgroundColor="var(--primary-100)">
                            <LetsPlayPage />
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route path="users/play/memory-cards"
                element={
                    <PrivateRoute>
                        <MemoryCardsGamePage backgroundColor="var(--primary-100)"/>
                    </PrivateRoute>}
            />
            <Route  path="/users/resources" 
                element={
                    <PrivateRoute>
                        <MainLayout backgroundColor="var(--secondary-100)">
                            <ResourcesPage />
                        </MainLayout>
                    </PrivateRoute>} 
            />
            <Route path="/users/profile" 
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <ProfilePage backgroundColor="var(--white)"/>
                        </MainLayout>
                    </PrivateRoute>} 
            />
            {/* 404 Route - If it's not logged goes to login, if it's logged goes to home page */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
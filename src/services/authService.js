import fetchService from "./fetchService";
const API_URL = "http://localhost:8080";

export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Usuario o contraseña incorrectos");
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}`);
        }


        const data = await response.json();
        
        // Saves token
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        // Saves username and role
        const userData = {
            username: data.username,
            role: data.role.replace('ROLE_', '')
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        return {
            token: data.token,
            username: data.username,
            role: data.role.replace('ROLE_', '')
        };
    } catch (error) {
        console.error("❌ Error en loginUser:", error);
        throw error;
    }
}

export async function logoutUser() {
    try {
        await fetchService.post('/auth/logout');
        
        // Cleans localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('✅ Sesión cerrada correctamente');

        return true;

    } catch (error) {
       console.error("❌ Error en logoutUser:", error);

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw error;
    }
}

// Helper for verifying authentication
export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Helper for getting token
export function getToken() {
    return localStorage.getItem('token');
}

// Helper for getting current user
export function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Helperfor getting user role
export function getUserRole() {
    const user = getCurrentUser();
    return user?.role || null;
}
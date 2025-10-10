const API_URL = "http://localhost:8080";

export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_URL}/login`, {
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
        
        console.log('✅ Respuesta del servidor:', data);

        // Saves token if it comes
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        // Saves user data
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data; 
    } catch (error) {
        console.error("❌ Error en loginUser:", error);
        throw error;
    }
}

export async function logoutUser() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }

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

// Helper for verify authentication
export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Helper for get current user
export function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
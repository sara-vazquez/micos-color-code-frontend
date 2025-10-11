const API_URL =  "http://localhost:8080";

export async function getProfile() {
    try {
        const token = localStorage.getItem('token');

        if(!token) {
            throw new Error("No hay sesión activa");
        }

        const response = await fetch(`${API_URL}/profile`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            "credentials": "include",
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Sesión expirada");
            }
            throw new Error("Error al obtener el perfil");
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error("❌ Error en getProfile:", error);
        throw error;
    }
}

export async function updateProfile(profileData) {
    try {
        const token = localStorage.getItem('token');

        if(!token) {
            throw new Error("No hay sesión activa");
        }

        const response = await fetch(`${API_URL}/profile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Sesión expirada");
            }
            if (response.status === 409) {
                throw new Error("El email o username ya está en uso");
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Error al actualizar el perfil");
        }

        const data = await response.json();

        if (data.username) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            user.username = data.username;
            localStorage.setItem('user', JSON.stringify(user));
        }
        
        return data;

    } catch (error) {
        console.error("❌ Error en updateProfile:", error);
        throw error;
    }
}
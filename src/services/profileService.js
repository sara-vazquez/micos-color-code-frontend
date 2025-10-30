import fetchService from "./fetchService";

const API_URL =  "http://localhost:8080/users";

export async function getProfile() {
    try {
        const data = await fetchService.get('/users/profile');
        return data;
    } catch (error) {
        console.error("❌ Error en getProfile:", error);
        throw error;
    }
}

export async function updateProfile(profileData) {
    try {
        const data = await fetchService.put('/users/profile', profileData);

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
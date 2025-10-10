const API_URL = "http://localhost:8080"

export async function registerUser(userData) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                captchaId: userData.captchaId,
                captchaAnswer: userData.captchaAnswer
            }),
        });
        
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("Captcha incorrecto o expirado");
            }
            if (response.status === 409) {
                throw new Error("El usuario o email ya existe");
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Usuario registrado:', data);
        
        return data;
    } catch (error) {
        console.error("❌ Error en registerUser:", error);
        throw error;
    }
}
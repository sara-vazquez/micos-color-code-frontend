const API_URL = "http://localhost:8080";

export async function getCaptcha() {
    try {
        const response = await fetch(`${API_URL}/captcha/generate`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error al obtener el captcha");
        }

        const data = await response.json();
        console.log('✅ Captcha obtenido:', data);
        
        return {
            id: data.id,           
            question: data.question 
        };
    } catch (error) {
        console.error("❌ Error en getCaptcha:", error);
        throw error;
    }
}
const API_URL = "http://localhost:8080";
//const token = localStorage.getItem('token');

export async function sendFeedback({ email, message }) {
    try {
        const response = await fetch(`${API_URL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ email, message }),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error("❌ Error en sendFeedback:", error);
        throw error;
    }
}

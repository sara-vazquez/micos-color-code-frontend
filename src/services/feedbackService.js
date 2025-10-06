const API_URL = "http://localhost:8080/api";

export async function sendFeedback({ email, message }) {
    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar el feedback");
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error en sendFeedback:", error);
      throw error;
    }
  }
  
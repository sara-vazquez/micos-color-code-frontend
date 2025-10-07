const API_URL = "http://localhost:8080";

export async function sendFeedback({ email, message }) {
    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      return response.json();
  
    } catch (error) {
      console.error("❌ Error en sendFeedback:", error);
      throw error;
    }
  }
  
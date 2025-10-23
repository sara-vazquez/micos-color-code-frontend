const API_URL = "http://localhost:8080"

export const gameSessionService = {
    async completeSession(gameId, points, timeCompleted = null) {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/play/${gameId}/sessions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer${token}`
            },
            body: JSON.stringify({points,timeCompleted})
        });

        if(!response.ok) {
            if(response.status === 401) {
                throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
            }
            throw new Error('Error al obtener el ranking');
        }
        return await response.json();
    }
}

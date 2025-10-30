const API_URL = 'http://localhost:8080';

export const gameSessionService = {
    async completeSession(gameId, points, timeCompleted = null, level, completed) {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_URL}/users/play/${gameId}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                points,
                timeCompleted,
                level,
                completed
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
            }
            throw new Error('Error al guardar la partida');
        }

        return await response.json();
    }
};
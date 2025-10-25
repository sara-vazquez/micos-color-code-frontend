const API_URL = 'http://localhost:8080';

export const rankingService = {
    async getRanking(gameId) {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_URL}/users/play/${gameId}/ranking`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
            }
            throw new Error('Error al obtener el ranking');
        }

        return await response.json();
    }
};
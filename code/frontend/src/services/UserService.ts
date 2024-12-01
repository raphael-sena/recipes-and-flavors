import axios from 'axios';

const apiUrl = 'http://localhost:8080/user'; 

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('authtoken');

        if (!token) {
        throw new Error('Token de autenticação não encontrado.');
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        throw error;
    }
};
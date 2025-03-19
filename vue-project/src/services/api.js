import axios from 'axios';

// URL base de tu API Laravel (asegúrate que Laravel esté corriendo en esta URL)
const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // Necesario por la autenticación de Sanctum
});

export default api;

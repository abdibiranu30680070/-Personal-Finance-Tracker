import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Automatically add JWT token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const login = (data) => api.post('/profile/login', data);
export const register = (data) => api.post('/profile/register', data);
export const updateProfile = (data) => api.put('/profile/update', data);
export const getTransactions = () => api.get('/transactions');
export const createTransaction = (data) => api.post('/transactions', data);
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
export const getSummary = () => api.get('/summary');
export const saveReport = (data) => api.post('/reports/save', data);

export default api;

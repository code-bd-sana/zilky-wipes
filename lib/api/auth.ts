import { api } from './axios';

export const authApi = {
  login: async (data: Record<string, unknown>) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  register: async (data: Record<string, unknown>) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

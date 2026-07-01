import { api } from './axios';

export const orderApi = {
  createOrder: async (data: Record<string, unknown>) => {
    const response = await api.post('/orders', data);
    return response.data;
  },
};

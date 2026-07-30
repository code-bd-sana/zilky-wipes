import { api } from './axios';

export type CustomerOrderHistory = {
  id: string;
  date: string;
  time: string;
  label: string;
  amount: string;
  status: string;
  isPending: boolean;
};

export type BackendCustomer = {
  id: string;
  name: string;
  email: string;
  joined: string;
  order: string;
  frequency: string;
  status: string;
  lifetimeValue: string;
  items: string;
  phone: string;
  subscriptionType: string;
  orderHistory: CustomerOrderHistory[];
};

export type GetCustomersResponse = {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: BackendCustomer[];
};

export const customerApi = {
  getAllCustomers: async (params?: Record<string, unknown>) => {
    const response = await api.get<GetCustomersResponse>('/users/customers', { params });
    return response.data;
  },
};

import { api } from './axios';

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  stock: number;
  subscriptionEligible: boolean;
  subscriptionDiscount: number;
  product: {
    name: string;
    description: string;
    images: string[];
  };
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type BackendSubscription = {
  id: string;
  userId: string;
  user?: User;
  productVariantId: string;
  productVariant: ProductVariant;
  stripeSubscriptionId: string;
  frequency: string;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'PAUSED' | 'UNPAID';
  startingDate: string;
  nextBillingDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionsResponse = {
  success: boolean;
  message: string;
  data: BackendSubscription[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export const subscriptionApi = {
  createSubscription: async (payload: { productVariantId: string; frequency: string; quantity?: number }) => {
    const response = await api.post('/subscriptions', payload);
    return response.data;
  },
  
  getMySubscriptions: async () => {
    const response = await api.get('/subscriptions/me');
    return response.data as { success: boolean; data: BackendSubscription[] };
  },

  getAllSubscriptions: async (params?: Record<string, unknown>) => {
    const response = await api.get('/subscriptions', { params });
    return response.data as SubscriptionsResponse;
  },

  getSubscriptionById: async (id: string) => {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data as { success: boolean; data: BackendSubscription };
  },

  updateSubscriptionStatus: async (payload: { id: string; status: BackendSubscription['status'] }) => {
    const response = await api.patch(`/subscriptions/${payload.id}/status`, { status: payload.status });
    return response.data;
  },

  pauseSubscription: async (id: string) => {
    const response = await api.post(`/subscriptions/${id}/pause`);
    return response.data;
  },

  resumeSubscription: async (id: string) => {
    const response = await api.post(`/subscriptions/${id}/resume`);
    return response.data;
  }
};

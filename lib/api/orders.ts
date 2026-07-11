import { api } from './axios';

export interface OrderItem {
  id: string;
  productVariantId: string;
  quantity: number;
  price: number;
  productVariant?: {
    id: string;
    name: string;
    product: {
      id: string;
      name: string;
      images: string[];
    };
  };
}

export interface BackendOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber?: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingStreetAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingPhone?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrdersListResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: BackendOrder[];
}

export const orderApi = {
  createOrder: async (data: Record<string, unknown>) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getAllOrders: async (params?: Record<string, unknown>) => {
    const response = await api.get<OrdersListResponse>('/orders', { params });
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get<{ success: boolean; data: BackendOrder[] }>('/orders/me');
    return response.data;
  },

  updateOrderStatus: async ({ id, status }: { id: string; status: BackendOrder['status'] }) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  updateOrderTracking: async ({ id, trackingNumber }: { id: string; trackingNumber: string }) => {
    const response = await api.patch(`/orders/${id}/tracking`, { trackingNumber });
    return response.data;
  },
};

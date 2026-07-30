import { api } from './axios';

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom?: string;
  validUntil?: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CouponResponse {
  success: boolean;
  message: string;
  data: Coupon;
}

export interface CouponsListResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Coupon[];
}

export const couponApi = {
  createCoupon: async (data: Partial<Coupon>) => {
    const response = await api.post<CouponResponse>('/coupons', data);
    return response.data;
  },

  getAllCoupons: async (params?: Record<string, unknown>) => {
    const response = await api.get<CouponsListResponse>('/coupons', { params });
    return response.data;
  },

  getCouponById: async (id: string) => {
    const response = await api.get<CouponResponse>(`/coupons/${id}`);
    return response.data;
  },

  getCouponByCode: async (code: string) => {
    const response = await api.get<CouponResponse>(`/coupons/code/${code}`);
    return response.data;
  },

  updateCoupon: async ({ id, data }: { id: string; data: Partial<Coupon> }) => {
    const response = await api.patch<CouponResponse>(`/coupons/${id}`, data);
    return response.data;
  },

  deleteCoupon: async (id: string) => {
    const response = await api.delete<CouponResponse>(`/coupons/${id}`);
    return response.data;
  }
};

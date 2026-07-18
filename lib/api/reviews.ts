import { api } from './axios';

export type Review = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  images: string[];
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
};

export type ReviewStats = {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
};

export const reviewsApi = {
  checkEligibility: async (productId: string) => {
    const response = await api.get(`/reviews/eligibility/${productId}`);
    return response.data as {
      success: boolean;
      data: { eligible: boolean; alreadyReviewed: boolean };
    };
  },

  createReview: async (payload: {
    productId: string;
    rating: number;
    comment?: string;
    images?: string[];
  }) => {
    const response = await api.post('/reviews', payload);
    return response.data as { success: boolean; data: Review };
  },

  getProductReviews: async (productId: string, params?: Record<string, unknown>) => {
    const response = await api.get(`/reviews/product/${productId}`, { params });
    return response.data as {
      success: boolean;
      data: Review[];
      meta: { total: number; page: number; limit: number };
    };
  },

  getProductReviewStats: async (productId: string) => {
    const response = await api.get(`/reviews/product/${productId}/stats`);
    return response.data as { success: boolean; data: ReviewStats };
  },

  getTopReviews: async (limit: number = 4) => {
    const response = await api.get('/reviews/top', { params: { limit } });
    return response.data as { success: boolean; data: Review[] };
  }
};

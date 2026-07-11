import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { reviewsApi } from '../lib/api/reviews';

export const useReviewEligibility = (productId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['review-eligibility', productId],
    queryFn: () => reviewsApi.checkEligibility(productId),
    enabled: enabled && !!productId,
    retry: false,
  });
};

export const useCreateReview = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewsApi.createReview,
    onSuccess: () => {
      toast.success('Thank you! Your review has been submitted.');
      queryClient.invalidateQueries({ queryKey: ['product-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['product-review-stats'] });
      queryClient.invalidateQueries({ queryKey: ['review-eligibility'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to submit review';
      toast.error(message);
    },
  });
};

export const useProductReviews = (productId: string, params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['product-reviews', productId, params],
    queryFn: () => reviewsApi.getProductReviews(productId, params),
    enabled: !!productId,
  });
};

export const useProductReviewStats = (productId: string) => {
  return useQuery({
    queryKey: ['product-review-stats', productId],
    queryFn: () => reviewsApi.getProductReviewStats(productId),
    enabled: !!productId,
  });
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { couponApi } from '../lib/api/coupons';

export const useGetCoupons = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['coupons', params],
    queryFn: () => couponApi.getAllCoupons(params),
  });
};

export const useGetCouponByCode = (code: string) => {
  return useQuery({
    queryKey: ['coupon', code],
    queryFn: () => couponApi.getCouponByCode(code),
    enabled: !!code,
    retry: false, // Don't retry if it returns 404
  });
};

export const useCreateCoupon = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponApi.createCoupon,
    onSuccess: () => {
      toast.success('Coupon created successfully');
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create coupon';
      toast.error(message);
    },
  });
};

export const useUpdateCoupon = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponApi.updateCoupon,
    onSuccess: () => {
      toast.success('Coupon updated successfully');
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update coupon';
      toast.error(message);
    },
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponApi.deleteCoupon,
    onSuccess: () => {
      toast.success('Coupon deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete coupon';
      toast.error(message);
    },
  });
};

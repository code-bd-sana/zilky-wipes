import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orderApi } from '../lib/api/orders';

export const useCreateOrder = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: (data) => {
      // The backend will respond with data.data.checkoutUrl (if wrapping with sendResponse)
      // or data.checkoutUrl directly depending on axios setup.
      const checkoutUrl = data?.data?.checkoutUrl || data?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error('Failed to retrieve checkout session from server.');
      }

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Failed to process order';
      toast.error(message);
    },
  });
};

export const useGetOrders = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderApi.getAllOrders(params),
  });
};

export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: () => orderApi.getMyOrders(),
  });
};

export const useUpdateOrderStatus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderApi.updateOrderStatus,
    onSuccess: () => {
      toast.success('Order status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to update order status';
      toast.error(message);
    },
  });
};

export const useUpdateOrderTracking = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderApi.updateOrderTracking,
    onSuccess: () => {
      toast.success('Tracking number updated successfully');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to update tracking number';
      toast.error(message);
    },
  });
};

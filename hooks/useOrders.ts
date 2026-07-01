import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orderApi } from '../lib/api/orders';
import { useCartStore } from '../store/useCartStore';

export const useCreateOrder = (onSuccess?: () => void) => {
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: () => {
      clearCart();
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

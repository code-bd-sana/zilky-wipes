import { useMutation } from '@tanstack/react-query';
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

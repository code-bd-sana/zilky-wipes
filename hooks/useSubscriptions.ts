import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { subscriptionApi } from '../lib/api/subscriptions';

export const useCreateSubscription = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: subscriptionApi.createSubscription,
    onSuccess: (data) => {
      const checkoutUrl = data?.data?.checkoutUrl || data?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error('Failed to retrieve subscription checkout session from server.');
      }

      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Failed to process subscription';
      toast.error(message);
    },
  });
};

export const useGetMySubscriptions = () => {
  return useQuery({
    queryKey: ['subscriptions', 'me'],
    queryFn: subscriptionApi.getMySubscriptions,
  });
};

export const useGetAllSubscriptions = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['subscriptions', 'all', params],
    queryFn: () => subscriptionApi.getAllSubscriptions(params),
  });
};

export const useGetSubscriptionById = (id: string) => {
  return useQuery({
    queryKey: ['subscriptions', id],
    queryFn: () => subscriptionApi.getSubscriptionById(id),
    enabled: !!id,
  });
};

export const useUpdateSubscriptionStatus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionApi.updateSubscriptionStatus,
    onSuccess: () => {
      toast.success('Subscription status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to update subscription status';
      toast.error(message);
    },
  });
};

export const usePauseSubscription = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionApi.pauseSubscription,
    onSuccess: () => {
      toast.success('Subscription paused successfully');
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to pause subscription';
      toast.error(message);
    },
  });
};

export const useResumeSubscription = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionApi.resumeSubscription,
    onSuccess: () => {
      toast.success('Subscription resumed successfully');
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to resume subscription';
      toast.error(message);
    },
  });
};

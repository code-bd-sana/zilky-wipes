import { useQuery } from '@tanstack/react-query';
import { customerApi } from '../lib/api/customers';

export const useGetCustomers = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getAllCustomers(params),
  });
};

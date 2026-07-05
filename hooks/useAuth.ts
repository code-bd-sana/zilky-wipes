import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '../lib/api/auth';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      const { accessToken, user } = data.data;

      // Store tokens and user
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('zilky_user', JSON.stringify(user));

      // Update the 'me' query instantly so Navbar knows we are logged in
      queryClient.setQueryData(['me'], { success: true, data: user });

      toast.success(`Welcome back, ${user.firstName}!`);

      if (user.role === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Invalid email or password';
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success('Account created successfully! Please log in.');
      router.push('/login');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Failed to create account';
      toast.error(message);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    retry: false, // Do not retry if we're just checking auth
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

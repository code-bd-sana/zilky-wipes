import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api/users";
import { toast } from "sonner";

export const useUsersList = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userApi.getUsers(params),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: () => {
      toast.success("User details updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update user";
      toast.error(message);
    },
  });
};

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: userApi.updateUserPassword,
    onSuccess: () => {
      toast.success("User password updated successfully!");
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update password";
      toast.error(message);
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateUserRole,
    onSuccess: () => {
      toast.success("User role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update user role";
      toast.error(message);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to delete user";
      toast.error(message);
    },
  });
};

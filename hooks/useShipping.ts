import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getShippingMethods,
  createShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
  CreateShippingMethodDto,
  UpdateShippingMethodDto,
} from "@/lib/api/shipping";

// ----------------------
// Shipping Methods Hooks
// ----------------------

export const useShippingMethods = () => {
  return useQuery({
    queryKey: ["shipping-methods"],
    queryFn: getShippingMethods,
  });
};

export const useCreateShippingMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShippingMethodDto) => createShippingMethod(data),
    onSuccess: () => {
      toast.success("Shipping method created successfully");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create shipping method");
    },
  });
};

export const useUpdateShippingMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; data: UpdateShippingMethodDto }) => updateShippingMethod(data),
    onSuccess: () => {
      toast.success("Shipping method updated successfully");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update shipping method");
    },
  });
};

export const useDeleteShippingMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteShippingMethod(id),
    onSuccess: () => {
      toast.success("Shipping method deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete shipping method");
    },
  });
};

// ----------------------
// Shipping Rules Hooks
// ----------------------

export const useCreateShippingRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: import("@/lib/api/shipping").CreateShippingRuleDto) => import("@/lib/api/shipping").then(m => m.createShippingRule(data)),
    onSuccess: () => {
      toast.success("Shipping rule created successfully");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create shipping rule");
    },
  });
};

export const useUpdateShippingRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; data: import("@/lib/api/shipping").UpdateShippingRuleDto }) => import("@/lib/api/shipping").then(m => m.updateShippingRule(data)),
    onSuccess: () => {
      toast.success("Shipping rule updated successfully");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update shipping rule");
    },
  });
};

export const useDeleteShippingRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => import("@/lib/api/shipping").then(m => m.deleteShippingRule(id)),
    onSuccess: () => {
      toast.success("Shipping rule deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete shipping rule");
    },
  });
};

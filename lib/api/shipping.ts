import { api } from "./axios";

// ----------------------
// Shipping Methods
// ----------------------

export interface ShippingMethod {
  id: string;
  name: string;
  description: string | null;
  estimatedDeliveryTime: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any[]; // We'll type this fully in Phase 2
}

export type CreateShippingMethodDto = Pick<ShippingMethod, "name" | "description" | "estimatedDeliveryTime" | "isActive">;
export type UpdateShippingMethodDto = Partial<CreateShippingMethodDto>;

export const getShippingMethods = async () => {
  const { data } = await api.get<{ success: boolean; data: ShippingMethod[] }>("/shipping/methods");
  return data.data;
};

export const createShippingMethod = async (payload: CreateShippingMethodDto) => {
  const { data } = await api.post<{ success: boolean; data: ShippingMethod }>("/shipping/methods", payload);
  return data.data;
};

export const updateShippingMethod = async ({ id, data: payload }: { id: string; data: UpdateShippingMethodDto }) => {
  const { data: response } = await api.patch<{ success: boolean; data: ShippingMethod }>(`/shipping/methods/${id}`, payload);
  return response.data;
};

export const deleteShippingMethod = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await api.delete<{ success: boolean; data: any }>(`/shipping/methods/${id}`);
  return data.data;
};

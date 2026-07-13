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
  rules?: ShippingRule[];
}

// ----------------------
// Shipping Rules
// ----------------------

export type ShippingActionType = "SET_PRICE" | "FREE_SHIPPING" | "PERCENTAGE_OFF";

export interface ShippingRule {
  id: string;
  name: string;
  methodId: string;
  isActive: boolean;
  priority: number;
  minOrderTotal: number | null;
  maxOrderTotal: number | null;
  minWeight: number | null;
  maxWeight: number | null;
  minItems: number | null;
  maxItems: number | null;
  targetCountries: string[];
  targetStates: string[];
  targetZipCodes: string[];
  isForSubscription: boolean | null;
  requiredCouponId: string | null;
  actionType: ShippingActionType;
  actionValue: number | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateShippingRuleDto = Omit<ShippingRule, "id" | "createdAt" | "updatedAt">;
export type UpdateShippingRuleDto = Partial<CreateShippingRuleDto>;

export type CreateShippingMethodDto = Pick<ShippingMethod, "name" | "description" | "estimatedDeliveryTime" | "isActive">;
export type UpdateShippingMethodDto = Partial<CreateShippingMethodDto>;

export const getShippingMethods = async () => {
  const { data } = await api.get<{ success: boolean; data: ShippingMethod[] }>("/shipping/methods");
  return data.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const estimateShipping = async (payload: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await api.post<{ success: boolean; data: { message: string, methods: any[] } }>("/shipping/estimate", payload);
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

// ----------------------
// Shipping Rules API
// ----------------------

export const createShippingRule = async (payload: CreateShippingRuleDto) => {
  const { data } = await api.post<{ success: boolean; data: ShippingRule }>("/shipping/rules", payload);
  return data.data;
};

export const updateShippingRule = async ({ id, data: payload }: { id: string; data: UpdateShippingRuleDto }) => {
  const { data: response } = await api.patch<{ success: boolean; data: ShippingRule }>(`/shipping/rules/${id}`, payload);
  return response.data;
};

export const deleteShippingRule = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await api.delete<{ success: boolean; data: any }>(`/shipping/rules/${id}`);
  return data.data;
};

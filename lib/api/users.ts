import { api } from "./axios";

export const userApi = {
  getUsers: async (params?: Record<string, unknown>) => {
    const response = await api.get("/users", { params });
    return response.data;
  },
  updateUser: async ({ id, data }: { id: string; data: { firstName?: string; lastName?: string; email?: string } }) => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },
  updateUserPassword: async ({ id, data }: { id: string; data: { password: string } }) => {
    const response = await api.patch(`/users/${id}/password`, data);
    return response.data;
  },
  updateUserRole: async ({ id, role }: { id: string; role: "ADMIN" | "USER" }) => {
    const response = await api.patch(`/users/${id}/role`, { role });
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

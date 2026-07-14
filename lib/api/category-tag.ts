import { api } from "./axios";

export const categoryApi = {
  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  createCategory: async (data: { name: string; description?: string }) => {
    const response = await api.post("/categories", data);
    return response.data;
  },
  updateCategory: async ({ id, data }: { id: string; data: { name?: string; description?: string } }) => {
    const response = await api.patch(`/categories/${id}`, data);
    return response.data;
  },
  deleteCategory: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export const tagApi = {
  getTags: async () => {
    const response = await api.get("/tags");
    return response.data;
  },
  createTag: async (data: { name: string }) => {
    const response = await api.post("/tags", data);
    return response.data;
  },
  updateTag: async ({ id, data }: { id: string; data: { name?: string } }) => {
    const response = await api.patch(`/tags/${id}`, data);
    return response.data;
  },
  deleteTag: async (id: string) => {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  },
};

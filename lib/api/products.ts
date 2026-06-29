import { api } from "./axios";

export const productsApi = {
  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  getTags: async () => {
    const response = await api.get("/tags");
    return response.data;
  },
  createProduct: async (formData: FormData) => {
    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

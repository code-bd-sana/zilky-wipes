import { api } from "./axios";

export const getPage = async (slug: string) => {
  try {
    const { data } = await api.get(`/pages/${slug}`);
    return data.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const upsertSection = async (slug: string, sectionKey: string, content: any) => {
  const { data } = await api.put(`/pages/${slug}/sections/${sectionKey}`, { content });
  return data.data;
};

export const createPage = async (slug: string, title: string, description?: string) => {
  const { data } = await api.post(`/pages`, { slug, title, description });
  return data.data;
};

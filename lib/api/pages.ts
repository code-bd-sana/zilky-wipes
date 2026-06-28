import { api } from './axios';

export const getPage = async (slug: string) => {
  try {
    const { data } = await api.get(`/pages/${slug}`);
    return data.data;
  } catch (error: unknown) {
    if ((error as { response?: { status?: number } }).response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const upsertSection = async (
  slug: string,
  sectionKey: string,
  content: Record<string, unknown>,
) => {
  const { data } = await api.put(`/pages/${slug}/sections/${sectionKey}`, { content });
  return data.data;
};

export const createPage = async (slug: string, title: string, description?: string) => {
  const { data } = await api.post(`/pages`, { slug, title, description });
  return data.data;
};

export const uploadMedia = async (pageName: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const { data } = await api.post(`/upload/${pageName}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.data; // returns an array of URLs
};

import { api } from "./axios";

export const submitGeneralFeedback = async (data: Record<string, unknown>) => {
  const response = await api.post("/feedbacks/general", data);
  return response.data;
};

export const getGeneralFeedbacks = async (query?: Record<string, unknown>) => {
  const params = new URLSearchParams();
  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined && query[key] !== null) {
        params.append(key, String(query[key]));
      }
    });
  }

  const response = await api.get(`/feedbacks/general?${params.toString()}`);
  return response.data;
};

export const submitMarketResearch = async (data: Record<string, unknown>) => {
  const response = await api.post("/feedbacks/market-research", data);
  return response.data;
};

export const getMarketResearchFeedbacks = async (query?: Record<string, unknown>) => {
  const params = new URLSearchParams();
  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined && query[key] !== null) {
        params.append(key, String(query[key]));
      }
    });
  }

  const response = await api.get(`/feedbacks/market-research?${params.toString()}`);
  return response.data;
};

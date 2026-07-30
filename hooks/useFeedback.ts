import { useMutation, useQuery } from "@tanstack/react-query";
import { submitGeneralFeedback, getGeneralFeedbacks, submitMarketResearch, getMarketResearchFeedbacks } from "../lib/api/feedback";
import { toast } from "sonner";

export const useSubmitGeneralFeedback = () => {
  return useMutation({
    mutationFn: submitGeneralFeedback,
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to submit feedback";
      toast.error(message);
    },
  });
};

export const useGetGeneralFeedbacks = (query?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["generalFeedbacks", query],
    queryFn: () => getGeneralFeedbacks(query),
  });
};

export const useSubmitMarketResearch = () => {
  return useMutation({
    mutationFn: submitMarketResearch,
    onSuccess: () => {
      toast.success("Thank you for your survey response!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to submit survey";
      toast.error(message);
    },
  });
};

export const useGetMarketResearchFeedbacks = (query?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["marketResearch", query],
    queryFn: () => getMarketResearchFeedbacks(query),
  });
};

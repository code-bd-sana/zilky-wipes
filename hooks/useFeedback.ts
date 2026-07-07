import { useMutation, useQuery } from "@tanstack/react-query";
import { submitGeneralFeedback, getGeneralFeedbacks } from "../lib/api/feedback";
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

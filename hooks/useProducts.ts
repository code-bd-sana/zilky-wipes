import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/lib/api/products";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: productsApi.getCategories,
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: productsApi.getTags,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/dashboard/products");
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        "Failed to create product";
      toast.error(message);
    },
  });
};

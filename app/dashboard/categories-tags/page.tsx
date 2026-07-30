import CategoriesTagsManager from "@/components/dashboard/categories-tags/categories-tags-manager";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories & Tags - Admin Dashboard",
  description: "Manage product categories and tags",
};

export default function CategoriesTagsPage() {
  return (
    <div className="flex-1 w-full bg-[#f9f9f9]">
      <CategoriesTagsManager />
    </div>
  );
}

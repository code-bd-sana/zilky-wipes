import UsersManager from "@/components/dashboard/users/users-manager";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management - Admin Dashboard",
  description: "Manage admin and user accounts",
};

export default function UsersPage() {
  return (
    <div className="flex-1 w-full bg-[#f9f9f9]">
      <UsersManager />
    </div>
  );
}

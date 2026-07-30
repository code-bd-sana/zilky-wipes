"use client";

import React from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { useDeleteUser } from "@/hooks/useUsers";
import type { User } from "./users-manager";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function DeleteUserModal({ isOpen, onClose, user }: DeleteUserModalProps) {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDelete = () => {
    deleteUser(user.id, { onSuccess: onClose });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-[12px] shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Delete User
              </h2>
              <p className="text-[14px] text-gray-500 mt-1">
                Are you sure you want to permanently delete <span className="font-semibold text-gray-700">{user.firstName} {user.lastName}</span>?
                This action cannot be undone and will erase their order history.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-[14px] font-medium text-gray-600 hover:bg-gray-200 rounded-[8px] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-white bg-red-600 hover:bg-red-700 rounded-[8px] transition-colors disabled:opacity-70"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

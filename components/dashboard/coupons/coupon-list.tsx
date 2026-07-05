"use client";

import { useState } from "react";
import DashboardDataTable, { type DashboardTableColumn } from "@/components/shared/dashboard-data-table";
import { Ticket, Percent, Search, Trash2, Edit } from "lucide-react";
import { useGetCoupons, useDeleteCoupon } from "@/hooks/useCoupons";
import type { Coupon } from "@/lib/api/coupons";
import CouponFormModal from "./coupon-form-modal";
import DeleteCouponModal from "./delete-coupon-modal";

export default function CouponList() {
  const [page] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState<Coupon | null>(null);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  const { data, isLoading } = useGetCoupons({ page, limit: 10 });
  const deleteCoupon = useDeleteCoupon();

  const handleEdit = (coupon: Coupon) => {
    setCouponToEdit(coupon);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setCouponToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = (coupon: Coupon) => {
    setCouponToDelete(coupon);
  };

  const confirmDelete = () => {
    if (couponToDelete) {
      deleteCoupon.mutate(couponToDelete.id, {
        onSuccess: () => setCouponToDelete(null)
      });
    }
  };

  const columns: DashboardTableColumn<Coupon>[] = [
    {
      id: "code",
      header: "Code",
      icon: Ticket,
      widthClassName: "w-[20%]",
      cell: (row) => <span className="font-semibold text-gray-800">{row.code}</span>,
    },
    {
      id: "discount",
      header: "Discount",
      icon: Percent,
      widthClassName: "w-[20%]",
      cell: (row) => (
        <span>
          {row.discountType === "PERCENTAGE" ? `${row.discountValue}%` : `$${row.discountValue.toFixed(2)}`}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      icon: Search,
      widthClassName: "w-[15%]",
      cell: (row) => (
        <span
          className={`inline-flex items-center rounded-[6px] px-2.5 py-0.5 text-xs font-base ${
            row.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      id: "usage",
      header: "Usage",
      icon: Search,
      widthClassName: "w-[15%]",
      cell: (row) => (
        <span className="text-gray-500">
          {row.usedCount} / {row.usageLimit ? row.usageLimit : "∞"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      icon: Search,
      widthClassName: "w-[30%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-3 py-1.5 text-sm text-[#262626] transition-colors hover:bg-[#efefef]"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading coupons...</div>;
  }

  return (
    <>
      <DashboardDataTable
        data={data?.data || []}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Search coupons..."
        searchPredicate={(row, query) => row.code.toLowerCase().includes(query.toLowerCase())}
        pageSizeOptions={[10, 20, 50]}
        defaultPageSize={10}
        addButton="+ Create Coupon"
        onAddClick={handleCreate}
      />

      <CouponFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        couponToEdit={couponToEdit}
      />

      {couponToDelete && (
        <DeleteCouponModal
          couponCode={couponToDelete.code}
          onClose={() => setCouponToDelete(null)}
          onConfirm={confirmDelete}
          isDeleting={deleteCoupon.isPending}
        />
      )}
    </>
  );
}

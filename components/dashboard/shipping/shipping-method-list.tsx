"use client";

import { useState } from "react";
import DashboardDataTable, { type DashboardTableColumn } from "@/components/shared/dashboard-data-table";
import { Truck, Clock, Settings2, Trash2, Edit } from "lucide-react";
import { useShippingMethods } from "@/hooks/useShipping";
import type { ShippingMethod } from "@/lib/api/shipping";
import ShippingMethodModal from "./shipping-method-modal";
import DeleteMethodModal from "./delete-method-modal";
import Link from "next/link";

export default function ShippingMethodList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState<ShippingMethod | null>(null);
  const [methodToDelete, setMethodToDelete] = useState<ShippingMethod | null>(null);

  const { data } = useShippingMethods();

  const handleEdit = (method: ShippingMethod) => {
    setMethodToEdit(method);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setMethodToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = (method: ShippingMethod) => {
    setMethodToDelete(method);
  };

  const columns: DashboardTableColumn<ShippingMethod>[] = [
    {
      id: "name",
      header: "Name",
      icon: Truck,
      widthClassName: "w-[25%]",
      cell: (row) => (
        <div>
          <span className="font-semibold text-gray-800 block">{row.name}</span>
          {row.description && <span className="text-xs text-gray-500 block truncate">{row.description}</span>}
        </div>
      ),
    },
    {
      id: "time",
      header: "Est. Delivery Time",
      icon: Clock,
      widthClassName: "w-[20%]",
      cell: (row) => (
        <span className="text-gray-600">
          {row.estimatedDeliveryTime || "-"}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      icon: Settings2,
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
      id: "rules",
      header: "Rules",
      icon: Settings2,
      widthClassName: "w-[15%]",
      cell: (row) => (
        <span className="text-gray-600 font-medium">
          {row.rules?.length || 0} Rule(s)
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      icon: Settings2,
      widthClassName: "w-[25%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          {/* We will build the rules page in Phase 2 */}
          <Link
            href={`/dashboard/shipping/${row.id}`}
            className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-3 py-1.5 text-sm text-[#262626] transition-colors hover:bg-[#efefef]"
          >
            <Settings2 className="w-4 h-4" /> Rules
          </Link>
          <button
            onClick={() => handleEdit(row)}
            className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-3 py-1.5 text-sm text-[#262626] transition-colors hover:bg-[#efefef]"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="inline-flex items-center justify-center rounded-md border border-[#FEE2E2] bg-[#FEF2F2] p-1.5 text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Shipping Methods</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-xl bg-[#7BB5A3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#68a08f]"
        >
          Add Method
        </button>
      </div>

      <DashboardDataTable
        columns={columns}
        data={data || []}
      />

      <ShippingMethodModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        methodToEdit={methodToEdit}
      />

      <DeleteMethodModal
        method={methodToDelete}
        onClose={() => setMethodToDelete(null)}
      />
    </div>
  );
}

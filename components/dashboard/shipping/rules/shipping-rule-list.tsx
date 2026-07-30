"use client";

import { useState } from "react";
import DashboardDataTable, { type DashboardTableColumn } from "@/components/shared/dashboard-data-table";
import { Filter, Settings2, Trash2, Edit } from "lucide-react";
import { useShippingMethods } from "@/hooks/useShipping";
import type { ShippingRule, ShippingMethod } from "@/lib/api/shipping";
import ShippingRuleModal from "./shipping-rule-modal";
import DeleteRuleModal from "./delete-rule-modal";

interface Props {
  methodId: string;
}

export default function ShippingRuleList({ methodId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ruleToEdit, setRuleToEdit] = useState<ShippingRule | null>(null);
  const [ruleToDelete, setRuleToDelete] = useState<ShippingRule | null>(null);

  const { data: methods } = useShippingMethods();

  const method = methods?.find((m: ShippingMethod) => m.id === methodId);
  const rules = method?.rules || [];

  const handleEdit = (rule: ShippingRule) => {
    setRuleToEdit(rule);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setRuleToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = (rule: ShippingRule) => {
    setRuleToDelete(rule);
  };

  const columns: DashboardTableColumn<ShippingRule>[] = [
    {
      id: "name",
      header: "Rule Name",
      icon: Filter,
      widthClassName: "w-[30%]",
      cell: (row) => (
        <div>
          <span className="font-semibold text-gray-800 block">{row.name}</span>
          <span className="text-xs text-gray-500 block truncate">Priority: {row.priority}</span>
        </div>
      ),
    },
    {
      id: "action",
      header: "Action",
      icon: Settings2,
      widthClassName: "w-[20%]",
      cell: (row) => (
        <span className="text-sm text-gray-700 font-medium">
          {row.actionType === "SET_PRICE" && `Flat Rate: $${row.actionValue}`}
          {row.actionType === "PERCENTAGE_OFF" && `Discount: ${row.actionValue}%`}
          {row.actionType === "FREE_SHIPPING" && <span className="text-green-600">Free Shipping</span>}
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
      id: "actions",
      header: "Actions",
      icon: Settings2,
      widthClassName: "w-[25%]",
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
            className="inline-flex items-center justify-center rounded-md border border-[#FEE2E2] bg-[#FEF2F2] p-1.5 text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium text-gray-700">
          Rules for: <span className="font-semibold text-gray-900">{method?.name}</span>
        </h3>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-xl bg-[#7BB5A3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#68a08f]"
        >
          Add Rule
        </button>
      </div>

      <DashboardDataTable
        columns={columns}
        data={rules}
      />

      <ShippingRuleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ruleToEdit={ruleToEdit}
        methodId={methodId}
      />

      <DeleteRuleModal
        rule={ruleToDelete}
        onClose={() => setRuleToDelete(null)}
      />
    </div>
  );
}

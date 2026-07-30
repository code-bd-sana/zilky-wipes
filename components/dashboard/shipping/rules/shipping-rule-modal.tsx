/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import type { ShippingRule, CreateShippingRuleDto, ShippingActionType } from "@/lib/api/shipping";
import { useCreateShippingRule, useUpdateShippingRule } from "@/hooks/useShipping";

interface ShippingRuleModalProps {
  open: boolean;
  onClose: () => void;
  ruleToEdit?: ShippingRule | null;
  methodId: string;
}

export default function ShippingRuleModal({ open, onClose, ruleToEdit, methodId }: ShippingRuleModalProps) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [priority, setPriority] = useState(0);
  
  // Conditions
  const [minOrderTotal, setMinOrderTotal] = useState<string>("");
  const [maxOrderTotal, setMaxOrderTotal] = useState<string>("");
  const [minWeight, setMinWeight] = useState<string>("");
  const [maxWeight, setMaxWeight] = useState<string>("");
  const [minItems, setMinItems] = useState<string>("");
  const [maxItems, setMaxItems] = useState<string>("");
  
  // Targets (CSV strings mapped to arrays on submit)
  const [targetCountries, setTargetCountries] = useState<string>("");
  const [targetStates, setTargetStates] = useState<string>("");
  const [targetZipCodes, setTargetZipCodes] = useState<string>("");

  const [isForSubscription, setIsForSubscription] = useState<"ALL" | "YES" | "NO">("ALL");
  
  // Action
  const [actionType, setActionType] = useState<ShippingActionType>("SET_PRICE");
  const [actionValue, setActionValue] = useState<string>("");

  const createMutation = useCreateShippingRule();
  const updateMutation = useUpdateShippingRule();

  const isEditing = !!ruleToEdit;
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (ruleToEdit) {
      setName(ruleToEdit.name || "");
      setIsActive(ruleToEdit.isActive);
      setPriority(ruleToEdit.priority || 0);
      
      setMinOrderTotal(ruleToEdit.minOrderTotal?.toString() || "");
      setMaxOrderTotal(ruleToEdit.maxOrderTotal?.toString() || "");
      setMinWeight(ruleToEdit.minWeight?.toString() || "");
      setMaxWeight(ruleToEdit.maxWeight?.toString() || "");
      setMinItems(ruleToEdit.minItems?.toString() || "");
      setMaxItems(ruleToEdit.maxItems?.toString() || "");
      
      setTargetCountries(ruleToEdit.targetCountries?.join(", ") || "");
      setTargetStates(ruleToEdit.targetStates?.join(", ") || "");
      setTargetZipCodes(ruleToEdit.targetZipCodes?.join(", ") || "");

      if (ruleToEdit.isForSubscription === true) setIsForSubscription("YES");
      else if (ruleToEdit.isForSubscription === false) setIsForSubscription("NO");
      else setIsForSubscription("ALL");

      setActionType(ruleToEdit.actionType);
      setActionValue(ruleToEdit.actionValue?.toString() || "");
    } else {
      setName("");
      setIsActive(true);
      setPriority(0);
      setMinOrderTotal("");
      setMaxOrderTotal("");
      setMinWeight("");
      setMaxWeight("");
      setMinItems("");
      setMaxItems("");
      setTargetCountries("");
      setTargetStates("");
      setTargetZipCodes("");
      setIsForSubscription("ALL");
      setActionType("SET_PRICE");
      setActionValue("");
    }
  }, [ruleToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const payload: CreateShippingRuleDto = {
      methodId,
      name,
      isActive,
      priority: Number(priority),
      minOrderTotal: minOrderTotal ? Number(minOrderTotal) : null,
      maxOrderTotal: maxOrderTotal ? Number(maxOrderTotal) : null,
      minWeight: minWeight ? Number(minWeight) : null,
      maxWeight: maxWeight ? Number(maxWeight) : null,
      minItems: minItems ? Number(minItems) : null,
      maxItems: maxItems ? Number(maxItems) : null,
      targetCountries: targetCountries ? targetCountries.split(",").map(s => s.trim()).filter(Boolean) : [],
      targetStates: targetStates ? targetStates.split(",").map(s => s.trim()).filter(Boolean) : [],
      targetZipCodes: targetZipCodes ? targetZipCodes.split(",").map(s => s.trim()).filter(Boolean) : [],
      isForSubscription: isForSubscription === "ALL" ? null : isForSubscription === "YES" ? true : false,
      requiredCouponId: null, // Skipping for now to keep it simple
      actionType,
      actionValue: actionType !== "FREE_SHIPPING" && actionValue ? Number(actionValue) : null,
    };

    if (isEditing && ruleToEdit) {
      updateMutation.mutate(
        { id: ruleToEdit.id, data: payload },
        { onSuccess: () => onClose() }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: () => onClose() });
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {isEditing ? "Edit Shipping Rule" : "Add Shipping Rule"}
          </h2>
          <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full text-gray-500'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* General Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Rule Name *</label>
                <input
                  required
                  placeholder="e.g. Free Shipping over $50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Priority (Higher runs first)</label>
                <input
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="ruleIsActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-[#7BB5A3] rounded focus:ring-[#7BB5A3]"
              />
              <label htmlFor="ruleIsActive" className="text-sm font-medium text-gray-700">Active</label>
            </div>
          </div>

          {/* Cart Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Cart Conditions (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Min Order Total ($)</label>
                <input type="number" step="0.01" value={minOrderTotal} onChange={(e) => setMinOrderTotal(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Max Order Total ($)</label>
                <input type="number" step="0.01" value={maxOrderTotal} onChange={(e) => setMaxOrderTotal(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Min Weight (kg)</label>
                <input type="number" step="0.01" value={minWeight} onChange={(e) => setMinWeight(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Max Weight (kg)</label>
                <input type="number" step="0.01" value={maxWeight} onChange={(e) => setMaxWeight(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-700">Subscription Status</label>
              <select 
                value={isForSubscription} 
                onChange={(e) => setIsForSubscription(e.target.value as "ALL" | "YES" | "NO")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none bg-white"
              >
                <option value="ALL">Applies to All Orders</option>
                <option value="YES">Only for Subscription Orders</option>
                <option value="NO">Only for One-Time Orders</option>
              </select>
            </div>
          </div>

          {/* Geographical Constraints */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Geographical Constraints (Optional)</h3>
            <p className="text-xs text-gray-500">Separate multiple values with a comma (e.g. US, CA, UK)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Target Countries</label>
                <input placeholder="US, CA" value={targetCountries} onChange={(e) => setTargetCountries(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Target States</label>
                <input placeholder="NY, CA" value={targetStates} onChange={(e) => setTargetStates(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Target Zip Codes</label>
                <input placeholder="10001, 90210" value={targetZipCodes} onChange={(e) => setTargetZipCodes(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none" />
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Resulting Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Action Type</label>
                <select 
                  value={actionType} 
                  onChange={(e) => setActionType(e.target.value as ShippingActionType)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none bg-white"
                >
                  <option value="SET_PRICE">Set Fixed Price</option>
                  <option value="PERCENTAGE_OFF">Percentage Off</option>
                  <option value="FREE_SHIPPING">Free Shipping</option>
                </select>
              </div>
              
              {actionType !== "FREE_SHIPPING" && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">
                    {actionType === "SET_PRICE" ? "Price ($)" : "Percentage (%)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={actionValue}
                    onChange={(e) => setActionValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7BB5A3] outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 pb-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-6 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !name}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#7BB5A3] hover:bg-[#68a08f] text-white font-medium transition-colors disabled:opacity-50"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Rule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

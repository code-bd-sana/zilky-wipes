import ShippingRuleList from "@/components/dashboard/shipping/rules/shipping-rule-list";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Shipping Rules | Dashboard",
  description: "Manage rules for a specific shipping method",
};

interface Props {
  params: { id: string };
}

export default function ShippingRulesPage({ params }: Props) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/shipping"
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">Shipping Rules</h2>
      </div>
      
      <ShippingRuleList methodId={params.id} />
    </div>
  );
}

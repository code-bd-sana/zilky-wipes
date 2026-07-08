import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function SubscriptionSuccessPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-[#008236]" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Subscription Active!</h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for subscribing! Your recurring order has been successfully set up. 
            You will receive a confirmation email shortly, and your first order is being processed.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/account/profile" 
              className="w-full bg-[#1D3A5F] text-white font-medium py-3.5 rounded-full hover:bg-[#152a46] transition-colors"
            >
              Manage My Subscriptions
            </Link>
            
            <Link 
              href="/shop" 
              className="w-full bg-white text-[#1D3A5F] border-2 border-[#1D3A5F] font-medium py-3.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { XCircle } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function SubscriptionCancelPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-center mb-6">
            <XCircle className="w-20 h-20 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Subscription Cancelled</h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            The subscription checkout process was cancelled or did not complete. 
            No charges were made to your account.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/shop" 
              className="w-full bg-[#1D3A5F] text-white font-medium py-3.5 rounded-full hover:bg-[#152a46] transition-colors"
            >
              Return to Shop
            </Link>
            
            <Link 
              href="/cart" 
              className="w-full bg-white text-[#1D3A5F] border-2 border-[#1D3A5F] font-medium py-3.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

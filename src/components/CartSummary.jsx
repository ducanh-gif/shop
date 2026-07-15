import React from 'react';
import { ShieldCheck, RotateCcw, Truck } from 'lucide-react';

const CartSummary = ({ subtotal = 0, onProceed }) => {
  const shipping = 0; // Miễn phí vận chuyển
  const tax = Math.round(subtotal * 0.08); // Thuế 8% làm tròn số nguyên cho tiền VND
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6 sticky top-6">
      <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight">Order Summary</h3>
      
      <div className="flex flex-col gap-3.5 text-sm font-medium border-b border-gray-100 pb-5">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <span className="text-gray-900 font-bold">{subtotal.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Shipping</span>
          <span className="text-emerald-600 font-bold uppercase text-xs bg-emerald-50 px-2 py-0.5 rounded">Free</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Estimated Tax (8%)</span>
          <span className="text-gray-900 font-bold">{tax.toLocaleString('vi-VN')} đ</span>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Promo Code</label>
        <div className="flex gap-2">
          <input type="text" placeholder="Enter code" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-[#1a3a2f] transition-all" />
          <button className="bg-[#e6f2ed] hover:bg-[#d8ebd2] text-[#1a3a2f] font-bold text-xs px-5 py-2.5 rounded-xl transition-colors">Apply</button>
        </div>
      </div>

      <div className="pt-2 flex justify-between items-baseline">
        <span className="text-sm font-bold text-gray-400">Total</span>
        <span className="text-4xl font-black text-[#1a3a2f] tracking-tight">{total.toLocaleString('vi-VN')} đ</span>
      </div>

      <button onClick={onProceed} className="w-full bg-[#008b66] hover:bg-[#007556] active:scale-[0.98] text-white font-bold text-sm py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Proceed to Secure Checkout
      </button>

      <div className="flex flex-col gap-3 pt-2 text-xs font-semibold text-gray-500">
        <div className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> <span>Secure SSL Encryption</span></div>
        <div className="flex items-center gap-2.5"><RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" /> <span>Free Returns within 30 days</span></div>
        <div className="flex items-center gap-2.5"><Truck className="w-4 h-4 text-emerald-600 shrink-0" /> <span>Eco-friendly carbon neutral shipping</span></div>
      </div>
    </div>
  );
};

export default CartSummary;
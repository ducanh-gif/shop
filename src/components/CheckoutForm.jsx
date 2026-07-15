import React, { useState } from 'react';
import { CreditCard, Wallet, QrCode, HelpCircle } from 'lucide-react';

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. THANH TIẾN TRÌNH (STEPS BAR) */}
      <div className="flex items-center justify-between max-w-xl mx-auto w-full mb-4 px-4">
        {/* Step 1: Shipping */}
        <div className="flex flex-col items-center gap-2 relative">
          <div className="w-7 h-7 rounded-full bg-[#006d44] text-white flex items-center justify-center text-xs font-bold ring-4 ring-[#e8f5f0]">
            ✓
          </div>
          <span className="text-xs font-bold text-[#006d44]">Shipping</span>
        </div>
        
        {/* Line 1 */}
        <div className="flex-1 h-[2px] bg-[#006d44] mx-2 -translate-y-3"></div>

        {/* Step 2: Payment */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#006d44] text-white flex items-center justify-center text-xs font-bold">
            2
          </div>
          <span className="text-xs font-bold text-[#006d44]">Payment</span>
        </div>

        {/* Line 2 */}
        <div className="flex-1 h-[2px] bg-gray-200 mx-2 -translate-y-3"></div>

        {/* Step 3: Review */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
            3
          </div>
          <span className="text-xs font-bold text-gray-400">Review</span>
        </div>
      </div>

      {/* 2. KHỐI EXPRESS CHECKOUT */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Express Checkout</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
            <span className="text-sm">Pay with Wallet</span>
          </button>
          <button className="bg-[#ffc439] hover:bg-[#f2b522] text-blue-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
            <span className="text-sm">Pay with Credit</span>
          </button>
        </div>
        <div className="relative flex py-2 items-center">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Or continue below
          </span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>
      </div>

      {/* 3. PHƯƠNG THỨC THANH TOÁN CHÍNH (PAYMENT METHOD) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Payment Method</h2>

        {/* Option 1: Credit Card */}
        <div 
          onClick={() => setPaymentMethod('credit-card')}
          className={`rounded-xl border transition-all overflow-hidden ${
            paymentMethod === 'credit-card' ? 'border-[#006d44] bg-[#f8fbf9]' : 'border-gray-200'
          }`}
        >
          <label className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'credit-card'}
                onChange={() => {}}
                className="w-4 h-4 text-[#006d44] focus:ring-[#006d44] border-gray-300"
              />
              <span className="text-sm font-bold text-gray-900">Credit Card</span>
            </div>
            <CreditCard className="w-5 h-5 text-gray-400" />
          </label>

          {/* Form điền thẻ (Chỉ mở ra khi chọn Credit Card) */}
          {paymentMethod === 'credit-card' && (
            <div className="px-4 pb-4 pt-2 border-t border-gray-100/70 bg-white grid grid-cols-12 gap-4">
              <div className="col-span-12 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Card Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000" 
                    className="w-full p-3 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#006d44] focus:border-[#006d44]"
                  />
                  <CreditCard className="w-4 h-4 text-gray-300 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="col-span-6 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#006d44] focus:border-[#006d44]"
                />
              </div>
              <div className="col-span-6 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  CVV <HelpCircle className="w-3 h-3 text-gray-300 cursor-pointer" />
                </label>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#006d44] focus:border-[#006d44]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Option 2: E-Wallet */}
        <label 
          onClick={() => setPaymentMethod('e-wallet')}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            paymentMethod === 'e-wallet' ? 'border-[#006d44] bg-[#f8fbf9]' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <input 
              type="radio" 
              name="payment" 
              checked={paymentMethod === 'e-wallet'}
              onChange={() => {}}
              className="w-4 h-4 text-[#006d44] focus:ring-[#006d44] border-gray-300"
            />
            <span className="text-sm font-bold text-gray-900">E-Wallet</span>
          </div>
          <Wallet className="w-5 h-5 text-gray-400" />
        </label>

        {/* Option 3: QR Code Scan */}
        <label 
          onClick={() => setPaymentMethod('qr-code')}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            paymentMethod === 'qr-code' ? 'border-[#006d44] bg-[#f8fbf9]' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <input 
              type="radio" 
              name="payment" 
              checked={paymentMethod === 'qr-code'}
              onChange={() => {}}
              className="w-4 h-4 text-[#006d44] focus:ring-[#006d44] border-gray-300"
            />
            <span className="text-sm font-bold text-gray-900">QR Code Scan</span>
          </div>
          <QrCode className="w-5 h-5 text-gray-400" />
        </label>
      </div>
    </div>
  );
};

export default CheckoutForm;
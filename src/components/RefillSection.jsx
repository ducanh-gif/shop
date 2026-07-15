import React from 'react';
import { ChevronRight, ShoppingCart, RefreshCw } from 'lucide-react';

const RefillSection = () => {
  return (
    <section className="bg-[#f3f9f6] border border-[#e6f2ed] rounded-3xl p-6 mb-4">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Đã đến lúc mua lại?</h3>
          <p className="text-gray-500 text-xs mt-0.5">Dựa trên lịch sử sử dụng, các thực phẩm bổ sung này có thể sắp hết.</p>
        </div>
        <button className="text-xs font-bold text-[#1a3a2f] hover:underline flex items-center gap-1">
          Xem tất cả reorder <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">D3</div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Vitamin D3 + K2</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Mua lần cuối 32 ngày trước</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#00cc99] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-50 rounded-xl border border-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">PRO</div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Probiotic Daily</h4>
              <p className="text-[11px] text-red-500 font-semibold mt-0.5">Sắp hết (Còn khoảng 5 ngày)</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#00cc99] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">WHEY</div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Whey Isolate (Choc)</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Đã đăng ký gói định kỳ: Giao ngày 30/10</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default RefillSection;
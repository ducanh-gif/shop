import React from 'react';
import { Check, Truck, Package } from 'lucide-react';

const ActiveOrder = ({ filter }) => {
  // Logic ẩn component nếu bộ lọc chọn các tab không khớp với đơn hàng đang xử lý
  if (filter !== 'All' && filter !== 'In Transit') return null;

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Thông tin gói hàng */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-50">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-[#fafbfa] rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            <div className="w-10 h-12 bg-[#2d5a49]/10 rounded border border-[#2d5a49]/20 flex items-center justify-center text-[10px] font-bold text-[#1a3a2f]">PRO</div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">Peak Performance Bundle</h4>
            <p className="text-xs text-gray-400 mt-0.5">Mã đơn #ORD-88219 • 3 sản phẩm</p>
            <p className="text-xs text-[#059669] font-semibold mt-1 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
              Dự kiến giao ngày 24/10/2026
            </p>
          </div>
        </div>
        
        <button className="bg-[#006677] hover:bg-[#005564] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#006677]/10 tracking-wide">
          Theo dõi đơn hàng
        </button>
      </div>

      {/* Stepper Timeline Tiến Trình */}
      <div className="pt-8 px-4">
        <div className="relative flex justify-between items-center w-full">
          <div className="absolute left-0 right-0 top-4 h-[4px] bg-gray-100 -z-10 rounded-full" />
          <div className="absolute left-0 w-1/3 top-4 h-[4px] bg-gradient-to-r from-[#00a884] to-[#00b4d8] -z-10 rounded-full" />

          {/* Bước 1: Packed */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-md shadow-[#00a884]/30">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-xs font-bold text-[#00a884]">Đã đóng gói</span>
          </div>

          {/* Bước 2: Shipped */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#00b4d8] flex items-center justify-center text-white shadow-md shadow-[#00b4d8]/30">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#00b4d8]">Đang vận chuyển</span>
          </div>

          {/* Bước 3: On Delivery */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-gray-400">Đang giao hàng</span>
          </div>

          {/* Bước 4: Delivered */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-gray-400">Đã giao thành công</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrder;
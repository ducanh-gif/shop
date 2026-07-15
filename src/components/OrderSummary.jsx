import React from 'react';
import { ShieldCheck, Fish, TestTube } from 'lucide-react';

const OrderSummary = ({ items, summaryData, handlesubmit }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

      {/* DANH SÁCH SẢN PHẨM RÚT GỌN */}
      <div className="flex flex-col gap-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* Box chứa icon giả lập ảnh sản phẩm sinh học */}
            <div className="w-12 h-12 bg-[#e8f5f0] text-[#006d44] rounded-xl flex items-center justify-center flex-shrink-0">
              {item.iconType === 'fish' ? <Fish className="w-5 h-5" /> : <TestTube className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 truncate">{item.title}</h4>
              <p className="text-xs font-semibold text-gray-400">Qty: {item.quantity}</p>
            </div>
            {/* 💰 Ép định dạng VND cho từng item */}
            <span className="text-sm font-bold text-gray-900">{item.price.toLocaleString('vi-VN')} đ</span>
          </div>
        ))}
      </div>

      {/* Ô NHẬP PROMO CODE */}
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          placeholder="Promo code" 
          className="flex-1 p-3 bg-[#f4f7f5] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-gray-200"
        />
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-5 py-3 rounded-xl text-sm transition-all">
          Apply
        </button>
      </div>

      {/* BẢNG TÍNH TOÁN CHI PHÍ */}
      <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 mb-4 text-sm font-medium">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          {/* 💰 Định dạng VND tạm tính */}
          <span className="text-gray-900 font-bold">{summaryData.subtotal.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className="text-gray-900 font-bold">
            {summaryData.shipping === 0 ? 'Free' : `${summaryData.shipping.toLocaleString('vi-VN')} đ`}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax</span>
          {/* 💰 Định dạng VND tiền thuế */}
          <span className="text-gray-900 font-bold">{summaryData.tax.toLocaleString('vi-VN')} đ</span>
        </div>
      </div>

      {/* TỔNG TIỀN CUỐI CÙNG */}
      <div className="flex justify-between items-baseline mb-6">
        <span className="text-base font-bold text-gray-950">Total</span>
        {/* 💰 Định dạng VND tổng hóa đơn */}
        <span className="text-2xl font-extrabold text-[#006d44]">{summaryData.total.toLocaleString('vi-VN')} đ</span>
      </div>

      {/* NÚT SUBMIT THANH TOÁN BẢO MẬT */}
      <button 
        onClick={handlesubmit} 
        className="w-full bg-[#006d44] hover:bg-[#005232] active:scale-[0.99] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm mb-4"
      >
        <ShieldCheck className="w-5 h-5 text-white" />
        {/* 💰 Định dạng VND hiển thị trên nút bấm kích hoạt ZaloPay */}
        Pay {summaryData.total.toLocaleString('vi-VN')} đ
      </button>

      {/* DÒNG CAM KẾT BẢO MẬT CHÂN TRANG */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-500">
        <span className="text-emerald-600 text-sm">🔒</span> Secure SSL Encrypted Checkout
      </div>
    </div>
  );
};

export default OrderSummary;
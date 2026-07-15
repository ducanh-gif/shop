import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

const ProductPurchaseForm = ({ product }) => {
  // State lưu tùy chọn mua hàng: 'subscribe' hoặc 'onetime'
  const [purchaseType, setPurchaseType] = useState('subscribe');

  return (
    <div className="w-full flex flex-col">
      {/* Badges chứng nhận phía trên tiêu đề */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-[#e8f5f0] text-[#006d44] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#d3ebd9]">
          Clinically Proven
        </span>
        <span className="bg-[#eef5f8] text-[#2c6e8f] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#d2e3eb]">
          Non-GMO
        </span>
      </div>

      {/* Tiêu đề sản phẩm */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight mb-2 leading-tight">
        {product.title}
      </h1>

      {/* Đánh giá sao & Số lượng Reviews */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex text-amber-400 text-sm">
          {'★'.repeat(5)} 
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {product.rating}
        </span>
        <span className="text-sm text-gray-500 font-medium">
          ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Mô tả ngắn */}
      <p className="text-gray-600 leading-relaxed mb-6 font-medium text-sm md:text-base">
        {product.description}
      </p>

      {/* Khối hiển thị Giá lớn tổng quan */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-4xl font-extrabold text-gray-950">
          ${purchaseType === 'subscribe' ? product.subscribePrice.toFixed(2) : product.price.toFixed(2)}
        </span>
        {purchaseType === 'subscribe' && (
          <span className="text-sm font-bold text-gray-400 line-through">
            ${product.price.toFixed(2)}
          </span>
        )}
        <span className="text-xs font-bold text-[#006d44] ml-auto uppercase tracking-wider">
          One-time purchase
        </span>
      </div>

      {/* KHỐI LỰA CHỌN PHƯƠNG THỨC MUA */}
      <div className="flex flex-col gap-3 mb-6">
        
        {/* Option 1: Đăng ký định kỳ (Subscribe & Save) */}
        <label 
          onClick={() => setPurchaseType('subscribe')}
          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
            purchaseType === 'subscribe'
              ? 'border-[#006d44] bg-[#f8fbf9]'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <input 
              type="radio" 
              name="purchaseOptions" 
              checked={purchaseType === 'subscribe'}
              onChange={() => {}} 
              className="w-4 h-4 text-[#006d44] focus:ring-[#006d44] border-gray-300"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Subscribe & Save 20%</span>
              <span className="text-xs text-gray-500 font-medium">Delivery every 30 days. Cancel anytime.</span>
            </div>
          </div>
          <span className="text-lg font-bold text-gray-900">${product.subscribePrice.toFixed(2)}</span>
        </label>

        {/* Option 2: Mua một lần duy nhất */}
        <label 
          onClick={() => setPurchaseType('onetime')}
          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
            purchaseType === 'onetime'
              ? 'border-[#006d44] bg-[#f8fbf9]'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <input 
              type="radio" 
              name="purchaseOptions" 
              checked={purchaseType === 'onetime'}
              onChange={() => {}} 
              className="w-4 h-4 text-[#006d44] focus:ring-[#006d44] border-gray-300"
            />
            <span className="text-sm font-bold text-gray-900">One-time Purchase</span>
          </div>
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </label>
      </div>

      {/* Nút bấm Add To Cart màu xanh Mint đặc trưng */}
      <button className="w-full bg-[#34d399] hover:bg-[#10b981] active:scale-[0.99] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md mb-6">
        <ShoppingBag className="w-5 h-5 fill-white" />
        Add to Cart
      </button>

      {/* Cam kết chân trang (Free Shipping & Guarantee) */}
      <div className="flex items-center justify-center gap-6 text-xs font-bold text-gray-600">
        <span className="flex items-center gap-1.5">📦 Free Shipping</span>
        <span className="flex items-center gap-1.5">🛡️ 30-Day Guarantee</span>
      </div>
    </div>
  );
};

export default ProductPurchaseForm;
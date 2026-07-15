import React from 'react';
import { Bookmark, Plus, Minus, Trash2 } from 'lucide-react';

// ✅ Bóc tách chuẩn các props truyền từ Cart.jsx vào component con
const CartItemList = ({ items, onUpdateQuantity, onRemoveItem }) => {

  // Nếu giỏ hàng trống, hiển thị giao diện thông báo nhẹ nhàng thay vì để box trắng
  if (!items || items.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-sm text-center">
        <p className="text-gray-400 font-medium">Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm divide-y divide-gray-100">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col sm:flex-row gap-5 py-6 first:pt-0 last:pb-0 group">
          
          {/* Ảnh sản phẩm vuông bo góc */}
          <div className="w-24 h-24 bg-[#f4f7f5] rounded-2xl overflow-hidden border border-gray-50 shrink-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Chi tiết thông tin sản phẩm */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h4 className="font-bold text-gray-950 text-lg tracking-tight">{item.name}</h4>
                {/* Cụm tag đặc tính viên thuốc màu xanh ngọc dịu nhẹ */}
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {item.tags && item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#e6f2ed] text-[#1a3a2f]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* 💰 ĐÃ SỬA: Tính toán tổng tiền theo số lượng và ép định dạng VND */}
              <span className="text-xl font-bold text-[#1a3a2f]">
                {(item.quantity * item.price).toLocaleString('vi-VN')} đ
              </span>
            </div>

            {/* Bộ điều khiển số lượng & Nút xóa / lưu lại sau */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center bg-gray-50 border border-gray-200/60 rounded-xl px-2 py-1 gap-3">
                {/* Nút giảm số lượng */}
                <button 
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-6 h-6 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                
                {/* Số lượng hiển thị */}
                <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                
                {/* Nút tăng số lượng */}
                <button 
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-6 h-6 rounded-lg hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* Nút Save for Later */}
                <button className="text-xs font-bold text-gray-400 hover:text-gray-700 flex items-center gap-1.5 transition-colors">
                  <Bookmark className="w-3.5 h-3.5" /> Lưu lại sau
                </button>

                {/* Nút Remove sản phẩm khỏi giỏ hàng */}
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-xs font-bold text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa
                </button>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default CartItemList;
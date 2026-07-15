import React from 'react';
import { ShoppingCart } from 'lucide-react'; 
import { useAuth } from "../context/AuthContext";
import { fetchCart, updateCart } from "../firebase/productService";

const ProductCard = ({ id, name, description, price, tag, image }) => {
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Chặn nổi bọt chuyển trang
    e.preventDefault();
    if (!user?.uid) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      const currentCartData = await fetchCart(user.uid);
      
      let cartItems = [];
      if (currentCartData) {
        cartItems = Array.isArray(currentCartData) ? currentCartData : [currentCartData];
      }

      const existingItem = cartItems.find(item => String(item.productId) === String(id));
      let updatedItems;

      if (existingItem) {
        updatedItems = cartItems.map(item => 
          String(item.productId) === String(id) ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...cartItems, { productId: id, quantity: 1 }];
      }
      console.log("Updated Cart Items:", updatedItems);
      await updateCart(user.uid, updatedItems);
      alert(`Đã thêm "${name}" vào giỏ hàng!`);

    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {tag && (
          <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-bold uppercase px-2 py-1 rounded group-hover:bg-emerald-600 transition-colors duration-200">
            {tag}
          </span>
        )}
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors duration-200">{name}</h4>
        <p className="text-xs text-gray-400 mb-4">{description}</p>
        
        <div className="flex items-center justify-between">
          {/* 💰 ĐÃ SỬA: Chuyển đổi hiển thị hoàn toàn sang định dạng VND */}
          <span className="text-lg font-bold text-gray-800">
            {price ? price.toLocaleString('vi-VN') : "0"} đ
          </span>
          
          {/* Nút thêm vào giỏ hàng */}
          <div 
            onClick={handleAddToCart}
            className="w-10 h-10 bg-emerald-700 hover:bg-emerald-600 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer relative z-50"
            style={{ pointerEvents: 'auto' }}
          >
            <ShoppingCart className="w-4 h-4 text-white pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { updateWishlist, fetchWishlist, fetchCart, updateCart } from "../firebase/productService";

// Gán giá trị mặc định products = [] để tránh lỗi render map khi undefined
const WishlistGrid = ({ products = [], onWishlistUpdate }) => {
  const { user } = useAuth();

  // Logic xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFromWishlist = async (productId, productName) => {
    if (!user?.uid) return;

    try {
      // Lấy danh sách yêu thích hiện tại từ Firebase
      const currentWishlist = await fetchWishlist(user.uid);
      
      // Lọc bỏ sản phẩm hiện tại ra khỏi mảng
      const updatedWishlist = currentWishlist.filter(
        (item) => String(item.productId) !== String(productId)
      );

      // Cập nhật mảng mới lên Firebase
      await updateWishlist(user.uid, updatedWishlist);
      
      // Kích hoạt callback báo cho trang cha Wishlist.jsx biết để reload giao diện
      if (onWishlistUpdate) {
        onWishlistUpdate();
      }
      
      alert(`Đã xóa "${productName}" khỏi danh sách yêu thích!`);
    } catch (error) {
      console.error("Lỗi khi xóa khỏi danh sách yêu thích:", error);
    }
  };

  // Logic thêm sản phẩm yêu thích vào giỏ hàng VÀ xóa sản phẩm đó khỏi Wishlist
  const handleAddToCart = async (productId, productName) => {
    if (!user?.uid) {
      alert("Vui lòng đăng nhập để thực hiện hành động này!");
      return;
    }

    try {
      // 1. Cập nhật Giỏ hàng (Cart)
      const currentCartData = await fetchCart(user.uid) || [];
      let cartItems = Array.isArray(currentCartData) ? currentCartData : [currentCartData];

      const existingItem = cartItems.find(item => String(item.productId) === String(productId));
      let updatedItems;

      if (existingItem) {
        updatedItems = cartItems.map(item => 
          String(item.productId) === String(productId) ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...cartItems, { productId, quantity: 1 }];
      }

      await updateCart(user.uid, updatedItems);

      // 2. Tự động xóa sản phẩm vừa thêm ra khỏi Wishlist
      const currentWishlist = await fetchWishlist(user.uid);
      const updatedWishlist = currentWishlist.filter(
        (item) => String(item.productId) !== String(productId)
      );
      await updateWishlist(user.uid, updatedWishlist);

      // 3. Thông báo cho trang cha render lại UI ngay lập tức
      if (onWishlistUpdate) {
        onWishlistUpdate();
      }

      alert(`Đã chuyển "${productName}" sang giỏ hàng thành công!`);
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((item) => (
        <div 
          key={item.id} 
          className="bg-white rounded-3xl border border-gray-100 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          {/* Khu vực ảnh sản phẩm */}
          <div className="relative w-full aspect-[4/3] bg-[#f4f7f5] rounded-2xl flex items-center justify-center overflow-hidden border border-gray-50 mb-4">
            
            {/* TAG NHÃN DÂN */}
            {item.category && (
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider z-10 bg-emerald-50 text-emerald-700">
                {item.category.toUpperCase()}
              </span>
            )}

            {/* NÚT XÓA KHỎI WISHLIST */}
            <button 
              onClick={() => handleRemoveFromWishlist(item.id, item.name)}
              className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 hover:scale-105 active:scale-95 transition-all z-10"
              title="Xóa khỏi yêu thích"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Ảnh sản phẩm */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Phần thông tin chữ */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-gray-950 text-base leading-snug tracking-tight group-hover:text-[#1a3a2f] transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {item.description || (item.features && item.features.join(', '))}
              </p>
            </div>

            {/* Giá cả & Định dạng VND */}
            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className="text-lg font-black text-gray-950">
                {item.price ? item.price.toLocaleString('vi-VN') : "0"} đ
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e6f7f0] text-[#059669]">
                Còn hàng
              </span>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <button 
              onClick={() => handleAddToCart(item.id, item.name)}
              className="w-full mt-4 border border-[#1a3a2f] hover:bg-[#1a3a2f] hover:text-white text-[#1a3a2f] font-bold text-xs py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 tracking-wide"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default WishlistGrid;
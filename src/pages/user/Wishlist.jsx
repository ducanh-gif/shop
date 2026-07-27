import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import WishlistGrid from "../../components/WishlistGrid"; 
import { ChevronRight, Loader2 } from 'lucide-react'; 
import { useAuth } from "../../context/AuthContext";
import { fetchWishlist, fetchProducts, updateCart, fetchCart, updateWishlist } from "../../firebase/productService"; 

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(false);

  // Lấy dữ liệu chi tiết các sản phẩm trong Wishlist từ Firebase
  useEffect(() => {
    const getWishlistData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const wishlistData = await fetchWishlist(user.uid); 
        
        if (wishlistData && wishlistData.length > 0) {
          const allProducts = await fetchProducts();
          const matchedProducts = allProducts.filter(product => 
            wishlistData.some(item => String(item.productId) === String(product.id))
          );
          setWishlistProducts(matchedProducts);
        } else {
          setWishlistProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách yêu thích:", error);
      } finally {
        setLoading(false);
      }
    };

    getWishlistData();
  }, [user, triggerReload]);

  // 🔥 XỬ LÝ CHUYỂN TẤT CẢ SANG CART VÀ XÓA SẠCH WISHLIST TỨC THÌ
  const handleMoveAllToCart = async () => {
    if (!user?.uid) return;
    if (wishlistProducts.length === 0) {
      alert("Danh sách yêu thích của bạn đang trống!");
      return;
    }

    try {
      setLoading(true);

      // 1. Lấy dữ liệu cart hiện tại từ Firebase
      const currentCart = await fetchCart(user.uid);
      let cartItems = Array.isArray(currentCart) ? [...currentCart] : [];

      // 2. Gom toàn bộ sản phẩm từ Wishlist vào Cart
      wishlistProducts.forEach(product => {
        const exist = cartItems.find(item => String(item.productId) === String(product.id));
        if (exist) {
          exist.quantity += 1;
        } else {
          cartItems.push({ productId: product.id, quantity: 1 });
        }
      });

      // 3. Cập nhật dữ liệu mới lên Firebase
      await updateCart(user.uid, cartItems);  // Cập nhật Cart
      await updateWishlist(user.uid, []);      // Xóa hết Wishlist trên database

      // 4. ✨ CẬP NHẬT TRỰC TIẾP STATE MẢNG RỖNG ĐỂ GIAO DIỆN BIẾN MẤT LẬP TỨC
      setWishlistProducts([]); 
      setTriggerReload(prev => !prev);

      alert("Đã chuyển toàn bộ sản phẩm sang giỏ hàng và làm sạch danh sách yêu thích!");
    } catch (error) {
      console.error("Lỗi khi chuyển tất cả sản phẩm sang giỏ hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfa] flex flex-col font-sans selection:bg-[#1a3a2f]/10">
      {/* Navbar phía trên */}
      <Navbar />

      {/* Vùng Layout chính */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-10 flex flex-row gap-8 items-start">
        
        {/* Sidebar bên trái */}
        <aside className="w-64 block shrink-0">
          <Sidebar user={user} />
        </aside>

        {/* Nội dung Wishlist bên phải */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1a3a2f] font-semibold">Wishlist</span>
          </div>

          {/* Tiêu đề & Nút Move all to Cart */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
                My Wishlist 
                <span className="text-sm font-normal text-gray-400 mt-2">
                  ({wishlistProducts.length} món)
                </span>
              </h2>
            </div>
            
            <button 
              onClick={handleMoveAllToCart}
              disabled={wishlistProducts.length === 0 || loading}
              className="bg-[#006677] hover:bg-[#005564] disabled:opacity-50 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm shadow-[#006677]/10 tracking-wide flex items-center gap-2 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
              Move all to Cart
            </button>
          </div>

          {/* Hiển thị Lưới sản phẩm hoặc Màn hình trống */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Loader2 className="w-8 h-8 text-[#006677] animate-spin" />
              <p className="text-gray-400 text-sm font-medium">Đang xử lý...</p>
            </div>
          ) : wishlistProducts.length > 0 ? (
            <WishlistGrid 
              products={wishlistProducts} 
              onWishlistUpdate={() => setTriggerReload(prev => !prev)} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 rounded-3xl bg-white gap-2">
              <span className="text-4xl">❤️</span>
              <p className="text-gray-900 font-bold text-lg mt-2">Danh sách yêu thích trống</p>
              <p className="text-gray-400 text-sm max-w-xs text-center">Hãy nhấn biểu tượng trái tim ở các sản phẩm ngoài cửa hàng để thêm vào đây nhé!</p>
            </div>
          )}

        </main>
      </div>

      {/* Footer cuối trang */}
      <Footer />
    </div>
  );
};

export default Wishlist;
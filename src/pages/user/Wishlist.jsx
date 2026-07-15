import React from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import WishlistGrid from "../../components/WishlistGrid"; // Component con xử lý danh sách card
import { ChevronRight } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const Wishlist = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafbfa] flex flex-col font-sans selection:bg-[#1a3a2f]/10">
      {/* Navbar phía trên */}
      <Navbar />

      {/* Vùng Layout chính */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-10 flex flex-row gap-8 items-start">
        
        {/* Thanh Sidebar bên trái */}
        <aside className="w-64 block shrink-0">
          <Sidebar user={user} />
        </aside>

        {/* Khu vực chứa nội dung Wishlist chính bên phải */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          
          {/* Breadcrumb đường dẫn nhỏ phía trên giống ảnh mẫu */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1a3a2f] font-semibold">Wishlist</span>
          </div>

          {/* Tiêu đề trang & Nút hành động nhanh */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
                My Wishlist 
                <span className="text-sm font-normal text-gray-400 mt-2">(5 items)</span>
              </h2>
            </div>
            
            {/* Nút Move all to Cart màu xanh teal đặc trưng */}
            <button className="bg-[#006677] hover:bg-[#005564] text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm shadow-[#006677]/10 tracking-wide flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
              Move all to Cart
            </button>
          </div>

          {/* Render Component con chứa lưới sản phẩm */}
          <WishlistGrid />

        </main>
      </div>

      {/* Footer ở cuối trang */}
      <Footer />
    </div>
  );
};

export default Wishlist;
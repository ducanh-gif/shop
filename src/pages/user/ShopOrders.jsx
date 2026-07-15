import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import ActiveOrder from "../../components/ActiveOrder";
import OrderHistory from "../../components/OrderHistory";
import RefillSection from "../../components/RefillSection";
import { Truck } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const ShopOrders = () => {
  // Giữ nguyên State quản lý tab để lọc dữ liệu ở component con
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'In Transit', 'Completed', 'Cancelled'];
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafbfa] flex flex-col font-sans selection:bg-[#1a3a2f]/10">
      <Navbar />

      {/* Vùng Layout chính */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-10 flex flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <aside className="w-64 block shrink-0">
          <Sidebar user={user} />
        </aside>

        {/* Khu vực chứa nội dung chính */}
        <main className="flex-1 min-w-0 flex flex-col gap-8">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">Đơn hàng của tôi</h2>
              <p className="text-gray-500 text-sm mt-1">Quản lý lịch sử mua thực phẩm bổ sung và theo dõi đơn hàng.</p>
            </div>
            
            {/* Bộ lọc Filter Tabs */}
            <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50">
              {filters.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    filter === tab
                      ? 'bg-[#0f2920] text-white shadow-md shadow-[#0f2920]/20'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {/* Hiển thị ngôn ngữ Tab thân thiện với người dùng Việt Nam */}
                  {tab === 'All' && 'Tất cả'}
                  {tab === 'In Transit' && 'Đang giao'}
                  {tab === 'Completed' && 'Hoàn thành'}
                  {tab === 'Cancelled' && 'Đã hủy'}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Active Orders */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
              <Truck className="w-5 h-5 text-[#1a3a2f]" /> Đơn hàng hiện tại
            </h3>
            {/* 🌟 TRUYỀN PROP FILTER: Giúp ActiveOrder ẩn đi nếu người dùng bấm tab 'Completed' hoặc 'Cancelled' */}
            <ActiveOrder filter={filter} />
          </div>

          {/* Section 2: Order History */}
          {/* 🌟 TRUYỀN PROP FILTER: Giúp OrderHistory tự động lọc các hàng dữ liệu tương ứng */}
          <OrderHistory filter={filter} />

          {/* Section 3: Time to refill */}
          <RefillSection />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ShopOrders;
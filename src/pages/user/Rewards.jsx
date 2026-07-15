import React from 'react';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import RewardsHeader from "../../components/RewardsHeader";
import RedeemGrid from "../../components/RedeemGrid";
import BoostBalance from "../../components/BoostBalance";
import RecentActivity from "../../components/RecentActivity";
import { useAuth } from "../../context/AuthContext";

const Rewards = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafbfa] flex flex-col font-sans selection:bg-[#1a3a2f]/10">
      <Navbar />

      {/* Vùng Layout chính */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-10 flex flex-row gap-8 items-start">
        
        {/* Sidebar bên trái */}
        <aside className="w-64 block shrink-0">
          <Sidebar user={user} />
        </aside>

        {/* Nội dung Rewards bên phải */}
        <main className="flex-1 min-w-0 flex flex-col gap-8">
          
          {/* Cụm 1: Thẻ thông tin thành viên & Điểm số tích lũy */}
          <RewardsHeader />

          {/* Cụm 2: Khối danh sách quà tặng đổi thưởng */}
          <RedeemGrid />

          {/* Cụm 3: Các nhiệm vụ kiếm thêm điểm */}
          <BoostBalance />

          {/* Cụm 4: Bảng lịch sử biến động điểm gần đây */}
          <RecentActivity />

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Rewards;
import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

const RewardsHeader = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row gap-8 justify-between items-stretch">
      
      {/* Bên trái: Tổng số điểm hiện tại */}
      <div className="flex flex-col justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#1a3a2f]/10 text-[#1a3a2f] px-3 py-1 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> PLATINUM MEMBER
          </span>
          <h2 className="text-3xl font-extrabold text-gray-950 mt-3">Hello, Alex</h2>
          <p className="text-gray-500 text-sm mt-0.5">Your health journey is paying off. You've unlocked exclusive Platinum benefits this month.</p>
        </div>
        
        <div className="pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black text-gray-950 tracking-tight">2,450</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Points Balance</span>
          </div>
        </div>
      </div>

      {/* Bên phải: Tiến trình thăng hạng (Next Tier) */}
      <div className="flex-1 lg:max-w-md bg-[#f3f9f6] border border-[#e6f2ed] rounded-2xl p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next Tier: Elite</h4>
            <p className="text-sm font-bold text-gray-900 mt-1">550 pts to go</p>
          </div>
          <span className="text-sm font-extrabold text-[#1a3a2f]">82%</span>
        </div>

        {/* Thanh Progress bar bo tròn tinh tế */}
        <div className="w-full bg-gray-200/70 h-2.5 rounded-full overflow-hidden">
          <div className="bg-[#1a3a2f] h-full rounded-full transition-all duration-500" style={{ width: '82%' }}></div>
        </div>

        <div className="flex gap-3 mt-1">
          <button className="flex-1 bg-[#1a3a2f] hover:bg-[#11261f] text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
            Redeem Points
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs py-2.5 rounded-xl border border-gray-200 transition-colors">
            Benefits Guide
          </button>
        </div>
      </div>

    </div>
  );
};

export default RewardsHeader;
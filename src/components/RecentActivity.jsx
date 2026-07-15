import React from 'react';
import { Download } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    { id: 1, name: "Purchase: Longevity Essentials Kit", date: "Nov 24, 2024", points: "+340 pts", isPositive: true },
    { id: 2, name: "Redeemed: Monthly Subscription Discount", date: "Nov 16, 2024", points: "-400 pts", isPositive: false },
    { id: 3, name: "Weekly Wellness Streak Bonus", date: "Nov 15, 2024", points: "+50 pts", isPositive: true },
    { id: 4, name: "Completed: Annual Health Assessment", date: "Nov 02, 2024", points: "+150 pts", isPositive: true }
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Activity</h3>
        <div className="flex gap-2">
          <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full cursor-pointer">All</span>
          <span className="text-gray-400 text-xs font-medium px-3 py-1 rounded-full hover:text-gray-700 cursor-pointer">Earned</span>
          <span className="text-gray-400 text-xs font-medium px-3 py-1 rounded-full hover:text-gray-700 cursor-pointer">Redeemed</span>
        </div>
      </div>

      {/* Bảng hoạt động */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafbfa] border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4">Activity</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm font-medium">
            {activities.map((act) => (
              <tr key={act.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4.5 text-gray-900 font-bold">{act.name}</td>
                <td className="px-6 py-4.5 text-gray-400 font-normal">{act.date}</td>
                <td className={`px-6 py-4.5 text-right font-bold text-base ${
                  act.isPositive ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {act.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Nút tải bảng sao kê dạng PDF */}
        <div className="p-4 bg-gray-50/50 text-center border-t border-gray-50">
          <button className="text-xs font-bold text-gray-400 hover:text-[#1a3a2f] inline-flex items-center gap-1.5 transition-colors">
            <Download className="w-3.5 h-3.5" /> Download Statement (PDF)
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;
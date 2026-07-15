import React from 'react';
import { ShoppingBag, Users, FileCheck, MessageSquare } from 'lucide-react';

const BoostBalance = () => {
  const tasks = [
    { id: 1, title: "Shop & Earn", desc: "2 points for every $1 spent on products.", icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />, bg: "bg-emerald-50" },
    { id: 2, title: "Refer Friends", desc: "Earn 500 points when they make their first purchase.", icon: <Users className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50" },
    { id: 3, title: "Complete Profile", desc: "Get 100 points for completing your health survey.", icon: <FileCheck className="w-5 h-5 text-amber-600" />, bg: "bg-amber-50" },
    { id: 4, title: "Write a Review", desc: "Earn 50 points for every verified product review.", icon: <MessageSquare className="w-5 h-5 text-cyan-600" />, bg: "bg-cyan-50" }
  ];

  return (
    <section>
      <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Boost Your Balance</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white border border-gray-100 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:translate-y-[-2px] transition-all duration-300">
            <div className={`w-10 h-10 ${task.bg} rounded-xl flex items-center justify-center shrink-0`}>
              {task.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm tracking-tight">{task.title}</h4>
              <p className="text-xs text-gray-400 mt-1 leading-normal">{task.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoostBalance;
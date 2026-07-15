import React from 'react';
import { PlusCircle } from 'lucide-react';

const ExploreSolutions = () => {
  return (
    <div className="w-full border-2 border-dashed border-[#e6f2ed] bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#1a3a2f]/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-[#f3f9f6] text-[#00cc99] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <PlusCircle className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-[#1a3a2f] mt-4 tracking-tight">Explore More Health Solutions</h3>
      <p className="text-gray-400 text-xs max-w-sm mt-1.5 leading-relaxed">
        Add more precision supplements to your routine based on your latest bio-markers.
      </p>
    </div>
  );
};

export default ExploreSolutions;
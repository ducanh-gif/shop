import React from 'react';

const SidebarFilters = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100/80 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button className="text-sm font-semibold text-[#006d44] hover:underline">
          Clear All
        </button>
      </div>

      {/* HEALTH GOAL */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Health Goal
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-800">
            <input 
              type="checkbox" 
              defaultChecked 
              className="w-4 h-4 rounded border-gray-300 text-[#006d44] focus:ring-[#006d44]" 
            />
            Cognitive Performance
          </label>
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[#006d44] focus:ring-[#006d44]" 
            />
            Immunity Support
          </label>
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[#006d44] focus:ring-[#006d44]" 
            />
            Metabolic Health
          </label>
        </div>
      </div>

      <hr className="border-gray-100 my-5" />

      {/* DELIVERY FORM */}
      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Delivery Form
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[#006d44] focus:ring-[#006d44]" 
            />
            Capsules
          </label>
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[#006d44] focus:ring-[#006d44]" 
            />
            Powder
          </label>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
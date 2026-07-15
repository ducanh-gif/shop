import React from 'react';
import { Download, FileText } from 'lucide-react';

const OrderHistory = () => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Order History</h3>
        <button className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-1.5 bg-white transition-all shadow-sm">
          Export CSV <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafbfa] border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            
            {/* Đơn 1 */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4.5">
                <span className="font-bold text-gray-900 block">#ORD-77402</span>
                <span className="text-xs text-gray-400 block mt-0.5">Immune Guard, Zinc Complex</span>
              </td>
              <td className="px-6 py-4.5 text-gray-600 font-medium">Sept 12, 2024</td>
              <td className="px-6 py-4.5">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f7f0] text-[#059669]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span> Completed
                </span>
              </td>
              <td className="px-6 py-4.5 font-bold text-gray-900">$124.99</td>
              <td className="px-6 py-4.5">
                <div className="flex items-center justify-center gap-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Invoice"><FileText className="w-4 h-4" /></button>
                  <button className="bg-gray-100 hover:bg-[#1a3a2f] hover:text-white text-gray-800 font-bold text-xs px-4 py-2 rounded-xl transition-all">Buy Again</button>
                </div>
              </td>
            </tr>

            {/* Đơn 2 */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4.5">
                <span className="font-bold text-gray-900 block">#ORD-76211</span>
                <span className="text-xs text-gray-400 block mt-0.5">Magnesium Glycinate (x2)</span>
              </td>
              <td className="px-6 py-4.5 text-gray-600 font-medium">Aug 28, 2024</td>
              <td className="px-6 py-4.5">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f7f0] text-[#059669]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span> Completed
                </span>
              </td>
              <td className="px-6 py-4.5 font-bold text-gray-900">$45.50</td>
              <td className="px-6 py-4.5">
                <div className="flex items-center justify-center gap-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Invoice"><FileText className="w-4 h-4" /></button>
                  <button className="bg-gray-100 hover:bg-[#1a3a2f] hover:text-white text-gray-800 font-bold text-xs px-4 py-2 rounded-xl transition-all">Buy Again</button>
                </div>
              </td>
            </tr>

            {/* Đơn 3 */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4.5">
                <span className="font-bold text-gray-900 block">#ORD-75109</span>
                <span className="text-xs text-gray-400 block mt-0.5">Ultimate Longevity Stack</span>
              </td>
              <td className="px-6 py-4.5 text-gray-600 font-medium">Aug 05, 2024</td>
              <td className="px-6 py-4.5">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Cancelled
                </span>
              </td>
              <td className="px-6 py-4.5 font-bold text-gray-900">$289.00</td>
              <td className="px-6 py-4.5">
                <div className="flex items-center justify-center gap-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Invoice"><FileText className="w-4 h-4" /></button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-4 py-2 rounded-xl transition-all">Details</button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderHistory;
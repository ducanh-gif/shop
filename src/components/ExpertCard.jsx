import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const ExpertCard = ({ name, role, image, description, tags, rating, reviewCount }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        {/* Phần đầu: Ảnh tròn đại diện + Tên & Chức danh */}
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={image} 
            alt={name} 
            className="w-14 h-14 rounded-full object-cover border border-gray-100"
          />
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">{name}</h3>
            <span className="text-xs font-bold text-emerald-700 tracking-wide">{role}</span>
          </div>
        </div>

        {/* Đoạn mô tả tiểu sử ngắn */}
        <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4">
          {description}
        </p>

        {/* Danh sách các thẻ tag chuyên môn (Badges) */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Phần cuối chân thẻ: Đánh giá và nút Book lịch */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50/80">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-gray-900">{rating}</span>
          <span className="text-[11px] text-gray-400 font-medium">({reviewCount})</span>
        </div>
        
        <button className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors group">
          Book <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ExpertCard;
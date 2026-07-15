import React from 'react';
import { Trash2, ShoppingCart, Star } from 'lucide-react';

const WishlistGrid = () => {
  // Mảng dữ liệu đã được thêm link hình ảnh sản phẩm thực tế chất lượng cao
  const wishlistItems = [
    {
      id: 1,
      name: "Magnesium Glycinate",
      subName: "High Bioavailability Formula",
      price: "34.00",
      rating: "4.9",
      tag: "SLEEP",
      tagBg: "bg-[#38bdf8]/10 text-[#0284c7]",
      status: "In Stock",
      statusClass: "bg-[#e6f7f0] text-[#059669]",
      // Ảnh hũ thuốc tối giản trên nền trắng/sạch
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 2,
      name: "Focus Complex",
      subName: "Lion's Mane & Nootropics",
      price: "42.50",
      rating: "4.8",
      tag: "COGNITIVE",
      tagBg: "bg-[#fb923c]/10 text-[#ea580c]",
      status: "Limited Stock",
      statusClass: "bg-amber-50 text-amber-700 border border-amber-100",
      image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 3,
      name: "Collagen Peptides",
      subName: "Pasture-Raised Type I & III",
      price: "49.00",
      rating: "5.0",
      tag: "LONGEVITY",
      tagBg: "bg-[#22d3ee]/10 text-[#0891b2]",
      status: "In Stock",
      statusClass: "bg-[#e6f7f0] text-[#059669]",
      image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 4,
      name: "Vitamin D3+K2",
      subName: "5000 IU Immune Support",
      price: "28.00",
      rating: "4.7",
      tag: "IMMUNITY",
      tagBg: "bg-[#38bdf8]/10 text-[#0284c7]",
      status: "In Stock",
      statusClass: "bg-[#e6f7f0] text-[#059669]",
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {wishlistItems.map((item) => (
        <div 
          key={item.id} 
          className="bg-white rounded-3xl border border-gray-100 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          {/* Khu vực ảnh sản phẩm */}
          <div className="relative w-full aspect-[4/3] bg-[#f4f7f5] rounded-2xl flex items-center justify-center overflow-hidden border border-gray-50 mb-4">
            
            {/* TAG NHÃN DÁN */}
            <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider z-10 ${item.tagBg}`}>
              {item.tag}
            </span>

            {/* NÚT XÓA KHỎI WISHLIST */}
            <button className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 hover:scale-105 active:scale-95 transition-all z-10">
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* THAY THẾ: Sử dụng thẻ <img> thực tế kèm hiệu ứng zoom nhẹ khi hover */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Phần thông tin chữ & Đánh giá */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-1">
                <h4 className="font-bold text-gray-950 text-base leading-snug tracking-tight group-hover:text-[#1a3a2f] transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-0.5 text-amber-500 shrink-0 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-bold text-gray-600">{item.rating}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{item.subName}</p>
            </div>

            {/* Giá cả & Tồn kho */}
            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className="text-lg font-black text-gray-950">${item.price}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.statusClass}`}>
                {item.status}
              </span>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <button className="w-full mt-4 border border-[#1a3a2f] hover:bg-[#1a3a2f] hover:text-white text-[#1a3a2f] font-bold text-xs py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 tracking-wide">
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default WishlistGrid;
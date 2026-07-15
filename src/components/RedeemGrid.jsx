import React from 'react';
import { Award } from 'lucide-react';

const RedeemGrid = () => {
  const rewards = [
    {
      id: 1,
      title: "Custom Meal Plan",
      category: "NUTRITION",
      desc: "A personalized 7-day meal plan designed by our clinical nutritionists.",
      points: "500 pts",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 2,
      title: "1:1 Health Coaching",
      category: "CONSULTATION",
      desc: "30-minute private session with a certified longevity expert.",
      points: "1,200 pts",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 3,
      title: "Omega-Elite Complex",
      category: "PRODUCT",
      desc: "Full-size bottle of our ultra-pure clinical grade Omega-3.",
      points: "850 pts",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: 4,
      title: "NH Smart Band",
      category: "TECH",
      desc: "Our proprietary health tracker with biometric optimization.",
      points: "2,000 pts",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Redeem Rewards</h3>
        <button className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">View All →</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rewards.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-gray-100 p-3.5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
            
            {/* Box chứa ảnh quà tặng */}
            <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden mb-4">
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-black/60 text-white backdrop-blur-sm z-10">
                {item.points}
              </span>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* Nội dung chi tiết */}
            <div className="flex-1 flex flex-col justify-between px-1">
              <div>
                <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase">{item.category}</span>
                <h4 className="font-bold text-gray-900 text-base leading-snug mt-0.5 tracking-tight group-hover:text-[#1a3a2f] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>

              {/* Nút đổi điểm */}
              <button className="w-full mt-4 border border-[#1a3a2f] hover:bg-[#1a3a2f] hover:text-white text-[#1a3a2f] font-bold text-xs py-2.5 rounded-xl transition-all duration-200">
                Redeem Now
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default RedeemGrid;
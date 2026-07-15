import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { User, ClipboardList, Heart, Gift } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth(); // Chỉ giữ lại user để hiển thị avatar card

  // Định nghĩa danh sách các mục Menu và path tương ứng
  const menuItems = [
    {
      name: 'Health Profile',
      path: '/home', // Khi ở trang chủ (Home), mục này sẽ tự động đổi màu
      icon: <User className="w-5 h-5" />
    },
    {
      name: 'Orders',
      path: '/shoporders', // Đổi màu khi ở trang Orders
      icon: <ClipboardList className="w-5 h-5" />
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      icon: <Heart className="w-5 h-5" />
    },
    {
      name: 'Rewards',
      path: '/rewards',
      icon: <Gift className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-64 bg-white p-4 flex flex-col gap-6">
      {/* Khối Avatar Card phía trên (Giống trong ảnh image_b3b886.png) */}
      <div className="bg-[#1a3a2f] text-white rounded-2xl p-6 flex flex-col items-center text-center gap-2">
        <div className="w-16 h-16 bg-[#4ade80]/20 text-[#4ade80] font-bold rounded-full flex items-center justify-center text-xl uppercase border border-[#4ade80]/30">
          {user?.displayName ? user.displayName.charAt(0) : 'M'}
        </div>
        <div>
          <h4 className="text-base font-semibold tracking-wide">
            {user?.displayName || 'mike lil'}
          </h4>
          <p className="text-xs text-[#4ade80] font-medium mt-0.5">Premium Member</p>
        </div>
      </div>

      {/* Danh sách Menu điều hướng tự động đổi màu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          // Kiểm tra xem URL hiện tại có trùng với item này không
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? 'bg-[#e6f7f0] text-[#1a3a2f]' // Màu nền xanh mint nhạt và chữ xanh đậm giống hệt ảnh của bạn
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {/* Thanh viền dọc màu xanh đậm ở bên trái khi Active */}
              {isActive && (
                <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#1a3a2f] rounded-r-md" />
              )}

              {/* Icon thay đổi màu sắc theo trạng thái */}
              <span className={`transition-colors ${isActive ? 'text-[#1a3a2f]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.icon}
              </span>

              {/* Tên mục */}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
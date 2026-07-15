import React from 'react';
// Import useLocation để nhận diện trang, Link để chuyển trang mượt mà
import { useLocation, Link } from 'react-router-dom';
import { Heart, ShoppingCart, User, LogOut } from 'lucide-react';
// Import custom hook Auth để gọi hàm đăng xuất từ Firebase
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useAuth(); // Lấy hàm logout từ context

  // Hàm helper để xử lý logic CSS cho từng Link
  const getNavLinkClass = (path) => {
    const baseClass = "relative py-1 font-medium transition-colors duration-300 tracking-wide text-base";
    
    if (currentPath === path) {
      return `${baseClass} text-white border-b-2 border-white`;
    } else {
      return `${baseClass} text-gray-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300`;
    }
  };

  return (
    <nav className="bg-[#1a3a2f] px-12 py-5 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity duration-300">
        NutriHealth
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-10">
        <Link to="/home" className={getNavLinkClass('/home')}>
          Home
        </Link>
        <Link to="/shop" className={getNavLinkClass('/shop')}>
          Shop
        </Link>
        <Link to="/consultation" className={getNavLinkClass('/consultation')}>
          Consultation
        </Link>
        <Link to="/science" className={getNavLinkClass('/science')}>
          Science
        </Link>
      </div>

      {/* Icons & Chức năng */}
      <div className="flex items-center gap-6">
        
        {/* CHỨC NĂNG MỚI: Click vào icon trái tim chuyển đến trang wishlist */}
        <Link 
          to="/wishlist" 
          className="block text-gray-300 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer"
          title="My Wishlist"
        >
          <Heart className="w-6 h-6" />
        </Link>
        
        {/* Click vào giỏ hàng chuyển đến trang cart */}
        <Link 
          to="/cart" 
          className="block text-gray-300 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer"
          title="My Orders"
        >
          <ShoppingCart className="w-6 h-6" />
        </Link>

        {/* Icon Tài khoản */}
        <Link 
          to="/profile" 
          className="block text-gray-300 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer"
          title="Profile"
        >
          <User className="w-6 h-6" />
        </Link>

        {/* Nút Log Out */}
        <button 
          onClick={logout}
          className="text-gray-300 hover:text-red-400 hover:scale-110 transform transition-all duration-300 cursor-pointer flex items-center gap-1 ml-2"
          title="Log Out"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-start justify-between gap-8">
        {/* Brand */}
        <div>
          <h4 className="text-emerald-700 font-bold text-lg mb-2 cursor-pointer hover:text-emerald-600 transition-colors duration-200">
            NutriHealth
          </h4>
          <p className="text-xs text-gray-400">
            © 2026 NutriHealth. Engineered for<br />Human Performance.
          </p>
        </div>
        
        {/* Links */}
        <div className="flex gap-16">
          <div className="space-y-2">
            <a href="#" className="block text-sm text-gray-600 hover:text-emerald-700 hover:translate-x-1 transition-all duration-200">Our Story</a>
            <a href="#" className="block text-sm text-gray-600 hover:text-emerald-700 hover:translate-x-1 transition-all duration-200">Laboratory Standards</a>
          </div>
          <div className="space-y-2">
            <a href="#" className="block text-sm text-gray-600 hover:text-emerald-700 hover:translate-x-1 transition-all duration-200">Clinical Studies</a>
            <a href="#" className="block text-sm text-gray-600 hover:text-emerald-700 hover:translate-x-1 transition-all duration-200">Privacy Policy</a>
          </div>
          <div className="space-y-2">
            <a href="#" className="block text-sm text-gray-600 hover:text-emerald-700 hover:translate-x-1 transition-all duration-200">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
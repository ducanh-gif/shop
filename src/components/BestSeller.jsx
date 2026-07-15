import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ image, title, description, price, isBestseller, isVegan }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col relative group">
      {/* Badge Bestseller */}
      {isBestseller && (
        <span className="absolute top-6 left-6 bg-[#006d44] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md z-10">
          Bestseller
        </span>
      )}

      {/* Product Image */}
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#f4f7f5] mb-4 flex items-center justify-center">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight cursor-pointer hover:text-[#006d44]">
            {title}
          </h3>
          <button className="text-gray-400 hover:text-red-500 transition-colors pt-1">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {/* Price & Labels */}
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          
          {isVegan && (
            <span className="bg-[#eaf5f0] text-[#006d44] text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#d3ebd9]">
              Vegan
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
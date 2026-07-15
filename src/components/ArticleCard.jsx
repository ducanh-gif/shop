import React from 'react';

import { Clock } from 'lucide-react';

const ArticleCard = ({ 
  title, 
  description, 
  category, 
  categoryColor = 'bg-emerald-700',
  image, 
  author, 
  authorAvatar, 
  readTime,
  size = 'normal' // 'normal' | 'large' | 'small'
}) => {
  
  // Large card (featured)
  if (size === 'large') {
    return (
      <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] group cursor-pointer">
        <img 
          src={image} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top - Category & Read Time */}
          <div className="flex items-center gap-3">
            <span className={`${categoryColor} text-white text-[10px] font-bold uppercase px-3 py-1 rounded`}>
              {category}
            </span>
            <span className="text-white/80 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min read
            </span>
          </div>
          
          {/* Bottom - Content */}
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 group-hover:text-emerald-300 transition-colors duration-200">
              {title}
            </h2>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center gap-3">
              <img 
                src={authorAvatar} 
                alt={author}
                className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
              />
              <span className="text-white text-sm font-medium">{author}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Small card (sidebar)
  if (size === 'small') {
    return (
      <div className="relative rounded-2xl overflow-hidden h-full min-h-[140px] group cursor-pointer">
        <img 
          src={image} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <span className={`${categoryColor} text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded w-fit mb-2`}>
            {category}
          </span>
          <h3 className="text-white text-sm font-bold group-hover:text-emerald-300 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  // Normal card (grid)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 ${categoryColor} text-white text-[9px] font-bold uppercase px-2 py-1 rounded`}>
          {category}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Author & Read Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={authorAvatar} 
              alt={author}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600">{author}</span>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
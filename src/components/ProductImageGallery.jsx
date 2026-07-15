import React, { useState } from 'react';
import { Search, Play } from 'lucide-react';

const ProductImageGallery = ({ images }) => {
  // State quản lý ảnh đang được chọn để hiển thị lớn
  const [selectedImage, setSelectedImage] = useState(images[0]?.url || '');

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Khung ảnh lớn chính */}
      <div className="w-full aspect-square bg-white rounded-3xl overflow-hidden relative border border-gray-100 flex items-center justify-center p-4">
        <img 
          src={selectedImage} 
          alt="Product main view" 
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* Nút Kính lúp phóng to ở góc phải dưới */}
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-100">
          <Search className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Danh sách ảnh nhỏ bổ trợ (Thumbnails) */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => !img.isVideo && setSelectedImage(img.url)}
            className={`aspect-square rounded-2xl overflow-hidden bg-white border-2 flex items-center justify-center relative p-1 transition-all ${
              selectedImage === img.url && !img.isVideo
                ? 'border-[#006d44]' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            {img.isVideo ? (
              // Nếu là ô Video thì hiển thị icon Play ở giữa
              <div className="w-full h-full bg-[#f4f7f5] rounded-xl flex items-center justify-center text-gray-400 group">
                <Play className="w-8 h-8 text-gray-400 group-hover:text-[#006d44] transition-colors" />
              </div>
            ) : (
              <img 
                src={img.url} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
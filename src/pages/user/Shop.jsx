import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/Productcard';
import SidebarFilters from '../../components/SidebarFilters';
import useProducts from '../../hooks/useProducts';

const Shop = () => {
  // Lấy dữ liệu từ custom hook
  const { products, loading, categories } = useProducts();

  return (
    <div className="min-h-screen bg-[#f3f8f5] flex flex-col font-sans selection:bg-[#006d44] selection:text-white">
      {/* Tái sử dụng Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 pb-16">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-gray-600 mb-4 flex items-center gap-1.5">
          <span className="hover:text-gray-900 cursor-pointer transition-colors">Trang chủ</span>
          <span className="text-gray-400 font-normal">›</span>
          <span className="text-gray-900">Cửa hàng</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3">
              Clinical Nutrition
            </h1>
            <p className="text-gray-600 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
              Thực phẩm bổ sung được nghiên cứu khoa học giúp tối ưu hóa các chỉ số sức khỏe và hiệu suất hàng ngày của bạn.
            </p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-sm font-bold text-gray-500 whitespace-nowrap">Sắp xếp:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-transparent rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:shadow focus:outline-none cursor-pointer transition-all">
                <option>Gợi ý tốt nhất</option>
                <option>Giá: Từ thấp đến cao</option>
                <option>Giá: Từ cao đến thấp</option>
                <option>Mới nhất</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Cột trái: Bộ lọc */}
          <aside className="lg:col-span-1">
            <SidebarFilters />
          </aside>

          {/* Cột phải: Khối sản phẩm & Tag đã chọn */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Active Filter Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white text-xs font-semibold text-gray-700 px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                Hiệu suất nhận thức
                <button className="hover:text-red-500 p-0.5 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>

            {/* Danh sách Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name}
                    description={product.description || product.features?.join(', ')}
                    price={product.price} // 🌟 Truyền nguyên bản số (Ví dụ: 350000) xuống cho ProductCard format VND
                    tag={product.badge || product.category}
                    image={product.image} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-20 text-gray-400 font-medium">
                Không tìm thấy sản phẩm nào phù hợp.
              </div>
            )}

          </div>
        </div>

      </main>

      {/* Tái sử dụng Footer */}
      <Footer />
    </div>
  );
};

export default Shop;
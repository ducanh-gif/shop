import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductImageGallery from '../../components/ProductImageGallery';
import ProductPurchaseForm from '../../components/ProductPurchaseForm';

const ProductDetail = () => {
  // Dữ liệu giả lập khớp hoàn hảo với thông tin sản phẩm trong ảnh mẫu
  const sampleProduct = {
    title: 'Advanced Cellular Vitality Complex',
    rating: 4.8,
    reviewCount: '1,245',
    description: 'Engineered to optimize mitochondrial function and combat cellular aging at the source. Formulated with our proprietary NAD+ precursor blend.',
    price: 89.00,
    subscribePrice: 71.20, // Đã giảm 20%
    images: [
      { url: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop&q=80', isVideo: false }, // Ảnh lọ chính
      { url: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?w=800&auto=format&fit=crop&q=80', isVideo: false }, // Ảnh thuốc nhộng viên nang
      { url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80', isVideo: false }, // Ảnh phân tử tế bào sinh học màu xanh
      { url: '', isVideo: true } // Ô Video cuối cùng
    ]
  };

  return (
    <div className="min-h-screen bg-[#f3f8f5] flex flex-col font-sans selection:bg-[#006d44] selection:text-white">
      {/* Tái sử dụng Navbar */}
      <Navbar />

      {/* Vùng chứa nội dung chi tiết sản phẩm */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10 flex items-center justify-center">
        <div className="bg-transparent w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cột trái: Chiếm 6/12 phần làm bộ sưu tập ảnh */}
          <section className="lg:col-span-6 w-full">
            <ProductImageGallery images={sampleProduct.images} />
          </section>

          {/* Cột phải: Chiếm 6/12 phần làm form đặt mua thông tin */}
          <section className="lg:col-span-6 w-full bg-white lg:bg-transparent p-6 lg:p-0 rounded-3xl shadow-sm lg:shadow-none border border-gray-100 lg:border-none">
            <ProductPurchaseForm product={sampleProduct} />
          </section>

        </div>
      </main>

      {/* Tái sử dụng Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ExpertCard from '../../components/ExpertCard';

const Consultation = () => {
  // Mảng dữ liệu chứa thông tin 3 chuyên gia y tế chuẩn xác theo ảnh thiết kế
  const expertsData = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins',
      role: 'Clinical Nutritionist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      description: 'Specializing in metabolic health and personalized supplement protocols based on advanced blood biomarkers analysis.',
      tags: ['Metabolism', 'Hormones'],
      rating: 4.9,
      reviewCount: 120
    },
    {
      id: 2,
      name: 'Dr. Marcus Thorne',
      role: 'Sports Dietitian',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      description: 'Focuses on athletic performance optimization, recovery strategies, and specialized vegan diets for elite endurance athletes.',
      tags: ['Performance', 'Vegan'],
      rating: 4.8,
      reviewCount: 85
    },
    {
      id: 3,
      name: 'Dr. Elena Rostova',
      role: 'Gut Health Specialist',
      image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?w=150&auto=format&fit=crop&q=80',
      description: 'Expert in microbiome analysis and developing dietary interventions for complex digestive issues and chronic inflammation.',
      tags: ['Microbiome', 'Digestion'],
      rating: 5.0,
      reviewCount: 210
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f8f5] flex flex-col font-sans selection:bg-[#006d44] selection:text-white">
      {/* Khối thanh menu trên cùng */}
      <Navbar />

      {/* KHỐI TRÊN: HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-8 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Nội dung text giới thiệu bên trái */}
        <div className="lg:col-span-6 flex flex-col items-start gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-tight">
            Expert <span className="text-[#006d44]">Guidance</span> <br />
            for Your Health Journey.
          </h1>
          <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed max-w-lg">
            Connect with top-tier nutritionists and clinical dietitians via secure telehealth. 
            Personalized insights driven by data.
          </p>
          <div className="flex gap-4 mt-2 w-full sm:w-auto">
            <button className="bg-[#006d44] hover:bg-[#005232] text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-sm">
              Book a Consultation
            </button>
            <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-sm">
              Learn More
            </button>
          </div>
        </div>

        {/* Khung ảnh mockup máy tính tablet bác sĩ tư vấn bên phải */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="w-full max-w-xl aspect-[1.5/1] rounded-3xl overflow-hidden shadow-md bg-white border border-gray-100 p-2">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80" 
              alt="Telehealth consultation preview" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* KHỐI DƯỚI: DANH SÁCH CHUYÊN GIA LÂM SÀNG */}
      <section className="bg-white border-t border-gray-100 flex-1 w-full py-14">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          
          {/* Tiêu đề mục chuyên gia */}
          <div className="text-center flex flex-col gap-2 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Meet Our Clinical Experts</h2>
            <p className="text-gray-500 font-semibold text-xs tracking-wide">
              Vetted professionals dedicated to your biological optimization.
            </p>
          </div>

          {/* Grid hiển thị danh sách thẻ chuyên gia */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertsData.map((expert) => (
              <ExpertCard key={expert.id} {...expert} />
            ))}
          </div>

        </div>
      </section>

      {/* Khối chân trang */}
      <Footer />
    </div>
  );
};

export default Consultation;
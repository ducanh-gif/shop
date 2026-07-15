import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/Productcard';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const mockProducts = [
    {
      id: 1,
      name: 'NeuroFocus Complex',
      description: 'Advanced nootropic blend for mental clarity.',
      price: 45.00,
      tag: 'Vegan',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400'
    },
    {
      id: 2,
      name: 'Arctic Omega-3',
      description: 'High-potency EPA/DHA for brain and heart support.',
      price: 32.00,
      tag: 'Sustainably Sourced',
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400'
    }
  ];
  console.log('User data in Home component:', user);
  return (
    
    <div className="min-h-screen bg-[#f8fbf9] flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-10 flex gap-8">
        <Sidebar user = {user} />

        <main className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome back, {user.displayName}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Health Points Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Health Points</p>
                <h2 className="text-4xl font-extrabold text-emerald-800 my-1 group-hover:scale-105 transition-transform duration-300 origin-left">2,450</h2>
                <p className="text-xs text-emerald-600 font-medium">↑ 120 points this month</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-gray-200 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              </div>
            </div>

            {/* Active Order Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Order</p>
                  <h3 className="text-lg font-bold text-gray-800">#ORD-9824A</h3>
                </div>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200">In Transit</span>
              </div>
              
              <div className="relative pt-2">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
                <div className="absolute top-5 left-0 w-1/2 h-0.5 bg-emerald-600"></div>
                <div className="flex justify-between relative text-center">
                  <div className="group cursor-pointer">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full mx-auto mb-2 group-hover:scale-150 transition-transform duration-200"></div>
                    <span className="text-[10px] text-gray-400 group-hover:text-emerald-600 transition-colors duration-200">Packed</span>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full mx-auto mb-2 group-hover:scale-150 transition-transform duration-200"></div>
                    <span className="text-[10px] text-emerald-600 font-medium">Shipped</span>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-2 group-hover:scale-150 group-hover:bg-emerald-400 transition-all duration-200"></div>
                    <span className="text-[10px] text-gray-400 group-hover:text-emerald-600 transition-colors duration-200">Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Personalized for You</h3>
                <p className="text-xs text-gray-400">Based on your recent cognitive health focus.</p>
              </div>
              <a href="#" className="text-xs font-bold text-emerald-700 hover:text-emerald-600 hover:underline transition-colors duration-200">View All</a>
            </div>

            <div className="flex justify-center gap-6">
              {mockProducts.map((prod) => (
                <ProductCard 
                  key={prod.id}
                  name={prod.name}
                  description={prod.description}
                  price={prod.price}
                  tag={prod.tag}
                  image={prod.image}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
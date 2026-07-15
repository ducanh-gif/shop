import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscribe logic
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-br from-[#e8f5f0] to-[#d4ede4] rounded-3xl p-8 md:p-12 text-center mx-4 md:mx-8 my-12">
      {/* Icon */}
      <div className="w-14 h-14 bg-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-6">
        <Mail className="w-7 h-7 text-white" />
      </div>
      
      {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
        Clinical Insights, Delivered.
        </h2>
      {/* Description */}
      <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
        Join 50,000+ health enthusiasts who receive our weekly dispatch of peer-reviewed research, actionable protocols, and exclusive NutriHealth formulations.
      </p>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
        >
          Subscribe Now
        </button>
      </form>
      
      {/* Privacy Note */}
      <p className="text-xs text-gray-500">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default Newsletter;
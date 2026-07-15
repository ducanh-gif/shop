import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ArticleCard from '../../components/ArticleCard';
import Newsletter from '../../components/Newsletter';

const Science = () => {
  const [activeCategory, setActiveCategory] = useState('All Articles');

  const categories = [
    'All Articles',
    'Nutrition Science',
    'Performance Training',
    'Mental Optimization',
    'Supplementation'
  ];

  const featuredArticle = {
    title: 'The Cellular Impact of Intermittent Fasting on Longevity',
    description: 'Recent clinical trials reveal how time-restricted eating triggers autophagy, significantly improving cellular repair mechanisms and metabolic health markers across varied age demographics.',
    category: 'Nutrition Science',
    categoryColor: 'bg-emerald-700',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    author: 'Dr. Sarah Jenkins, PhD',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    readTime: 8
  };

  const sideArticles = [
    {
      title: 'Optimizing Hypertrophy: The Science of Progressive...',
      category: 'Training',
      categoryColor: 'bg-orange-600',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
    },
    {
      title: 'Cortisol Management: Mindfulness Protocols for...',
      category: 'Mental Health',
      categoryColor: 'bg-teal-600',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'
    }
  ];

  const articles = [
    {
      id: 1,
      title: 'Bioavailability Explained: Why Form Matters in Vitamins',
      description: 'Not all supplements are created equal. Discover the crucial differences between synthetic isolates and food-grown nutrient complexes.',
      category: 'Supplementation',
      categoryColor: 'bg-emerald-700',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      author: 'Dr. M. Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      readTime: 6
    },
    {
      id: 2,
      title: 'Decoding HRV: The Ultimate Metric for Recovery',
      description: 'Heart Rate Variability is no longer just for elite athletes. Learn how tracking your HRV can prevent overtraining and optimize your performance.',
      category: 'Performance Training',
      categoryColor: 'bg-rose-600',
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400',
      author: 'Elena Rostova',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      readTime: 5
    },
    {
      id: 3,
      title: 'The Gut-Brain Axis: Nutritional Psychiatry',
      description: 'Emerging research draws a direct line between the microbiome and mood regulation. How prebiotics and specific nutrients impact mental health.',
      category: 'Nutrition Science',
      categoryColor: 'bg-amber-600',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400',
      author: 'Dr. Sarah Jenkins',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      readTime: 11
    },
    {
      id: 4,
      title: 'Breathwork Protocols for Down-Regulating the Nervous System',
      description: 'Practical, scientifically validated breathing techniques to quickly shift from sympathetic (fight or flight) to parasympathetic (rest and digest) state.',
      category: 'Mental Optimization',
      categoryColor: 'bg-purple-600',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      author: 'James Althorp',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      readTime: 4
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fbf9] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Featured Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <ArticleCard {...featuredArticle} size="large" />
          </div>
          
          {/* Side Articles */}
          <div className="flex flex-col gap-4">
            {sideArticles.map((article, index) => (
              <ArticleCard key={index} {...article} size="small" />
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-500 hover:text-emerald-700'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        {/* Articles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} size="normal" />
          ))}
        </section>

        {/* Load More Button */}
        <div className="text-center mb-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
            Load More Articles
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Science;
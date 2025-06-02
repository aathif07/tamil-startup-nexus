
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsEvents = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const newsItems = [
    {
      id: 1,
      type: 'news',
      title: 'India Tops Startup Ranking for Third Consecutive Year',
      excerpt: 'The state continues to lead in innovation and entrepreneurship support...',
      date: '2024-01-15',
      category: 'Achievement'
    },
    {
      id: 2,
      type: 'news',
      title: 'New ₹500 Crore Fund Launched for Deep Tech Startups',
      excerpt: 'Government announces major investment in emerging technologies...',
      date: '2024-01-10',
      category: 'Funding'
    }
  ];

  const events = [
    {
      id: 3,
      type: 'event',
      title: 'Global Startup Summit 2024',
      excerpt: 'Three-day event featuring international speakers and networking',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Chennai Trade Centre',
      category: 'Conference'
    },
    {
      id: 4,
      type: 'event',
      title: 'Women Entrepreneurs Workshop',
      excerpt: 'Empowering women in business with practical tools and mentorship',
      date: '2024-02-20',
      time: '10:00 AM',
      location: 'Coimbatore Innovation Hub',
      category: 'Workshop'
    },
    {
      id: 5,
      type: 'event',
      title: 'AgriTech Innovation Challenge',
      excerpt: 'Competition for agricultural technology solutions',
      date: '2024-04-05',
      time: '11:00 AM',
      location: 'Madurai Tech Park',
      category: 'Competition'
    }
  ];

  const allItems = [...newsItems, ...events];
  
  const filteredItems = activeFilter === 'all' 
    ? allItems 
    : allItems.filter(item => item.type === activeFilter);

  const filters = [
    { key: 'all', label: 'All Updates' },
    { key: 'news', label: 'News' },
    { key: 'event', label: 'Events' }
  ];

  return (
    <section id="news-events" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Latest News & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest developments in India's startup ecosystem
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Filter size={16} className="mr-2" />
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* News Ticker */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-red-600 text-white p-4 rounded-lg mb-12 overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center space-x-8"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="font-semibold whitespace-nowrap">BREAKING:</span>
            <span className="whitespace-nowrap">India announces ₹1000 crore startup fund</span>
            <span className="whitespace-nowrap">•</span>
            <span className="whitespace-nowrap">New incubation centers in 10 districts</span>
            <span className="whitespace-nowrap">•</span>
            <span className="whitespace-nowrap">Global partnerships with Silicon Valley</span>
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Header Image/Icon */}
              <div className={`h-48 bg-gradient-to-br ${
                item.type === 'news' 
                  ? 'from-blue-500 to-cyan-500' 
                  : 'from-red-500 to-pink-500'
              } flex items-center justify-center relative overflow-hidden`}>
                <motion.div
                  className="text-center text-white"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {item.type === 'news' ? (
                    <div className="text-6xl opacity-20">📰</div>
                  ) : (
                    <Calendar size={60} className="opacity-20" />
                  )}
                  <div className="mt-2 font-semibold text-lg">
                    {item.type === 'news' ? 'Latest News' : 'Upcoming Event'}
                  </div>
                </motion.div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  
                  {item.type === 'event' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{(item as any).time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{(item as any).location}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white"
                  size="sm"
                >
                  {item.type === 'news' ? 'Read More' : 'Register Now'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-semibold"
          >
            View All Updates
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsEvents;

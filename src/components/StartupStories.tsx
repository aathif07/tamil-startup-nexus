
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StartupStories = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const stories = [
    {
      id: 1,
      name: 'Priya Sharma',
      company: 'EcoTech Solutions',
      image: '/placeholder.svg',
      quote: 'The support from Startup Dotin transformed our vision into a thriving business. Their mentorship program was invaluable.',
      sector: 'CleanTech',
      growth: '300% revenue growth',
      videoUrl: '#'
    },
    {
      id: 2,
      name: 'Arjun Krishnan',
      company: 'HealthCare AI',
      image: '/placeholder.svg',
      quote: 'From a small team of 3 to a company of 50+ employees, our journey with Startup Dotin has been incredible.',
      sector: 'HealthTech',
      growth: '₹10Cr funding raised',
      videoUrl: '#'
    },
    {
      id: 3,
      name: 'Sneha Patel',
      company: 'EdTech Innovations',
      image: '/placeholder.svg',
      quote: 'The incubation program provided us with the resources and network needed to scale our educational platform.',
      sector: 'EdTech',
      growth: '1M+ users',
      videoUrl: '#'
    },
    {
      id: 4,
      name: 'Rajesh Kumar',
      company: 'AgriSmart',
      image: '/placeholder.svg',
      quote: 'Startup Dotin helped us bring technology to rural farmers, creating impact beyond just profits.',
      sector: 'AgriTech',
      growth: '50K+ farmers impacted',
      videoUrl: '#'
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from entrepreneurs who transformed their dreams into successful businesses
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Story Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Story Content */}
              <div className="order-2 lg:order-1">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Quote className="absolute -top-4 -left-4 text-6xl text-blue-200 z-0" />
                  <blockquote className="text-2xl text-gray-700 leading-relaxed mb-8 relative z-10">
                    "{stories[currentStory].quote}"
                  </blockquote>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {stories[currentStory].name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {stories[currentStory].name}
                    </h3>
                    <p className="text-gray-600">{stories[currentStory].company}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {stories[currentStory].sector}
                  </span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {stories[currentStory].growth}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white">
                    <Play size={20} className="mr-2" />
                    Watch Video Story
                  </Button>
                </motion.div>
              </div>

              {/* Story Visual */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-red-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    <motion.div
                      className="text-center"
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                        {stories[currentStory].name.charAt(0)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {stories[currentStory].company}
                      </h3>
                    </motion.div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play size={32} className="text-blue-600 ml-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-12 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStory}
              className="rounded-full w-12 h-12 p-0"
            >
              <ChevronLeft size={20} />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentStory(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextStory}
              className="rounded-full w-12 h-12 p-0"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupStories;

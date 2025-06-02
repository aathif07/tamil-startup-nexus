
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Sprout, Globe } from 'lucide-react';

const InitiativesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const initiatives = [
    {
      icon: Globe,
      title: 'Tamil Nadu Startup and Innovation Mission',
      description: 'A comprehensive mission to establish Tamil Nadu as a global startup hub, fostering innovation and entrepreneurship across all sectors.',
      highlights: ['Policy Framework', 'Infrastructure Development', 'Global Partnerships', 'Innovation Ecosystem'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Women Startups',
      description: 'Dedicated support programs for women entrepreneurs, providing mentorship, funding, and networking opportunities.',
      highlights: ['Women-only Incubators', 'Mentorship Programs', 'Funding Support', 'Leadership Development'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: BookOpen,
      title: 'Student Entrepreneurship',
      description: 'Empowering students and young entrepreneurs with resources, guidance, and platforms to transform ideas into viable businesses.',
      highlights: ['University Partnerships', 'Student Incubators', 'Skill Development', 'Startup Competitions'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Sprout,
      title: 'Rural Innovation',
      description: 'Bringing innovation and entrepreneurship to rural areas, focusing on agriculture, traditional crafts, and local solutions.',
      highlights: ['AgTech Solutions', 'Rural Incubators', 'Local Partnerships', 'Sustainable Development'],
      color: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <section id="initiatives" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Our Initiatives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic programs designed to nurture innovation across diverse sectors and communities
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {initiatives.map((initiative, index) => (
            <motion.button
              key={initiative.title}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <initiative.icon size={20} />
                <span className="hidden sm:inline">{initiative.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                className={`inline-flex items-center space-x-3 px-4 py-2 bg-gradient-to-r ${initiatives[activeTab].color} rounded-full text-white mb-6`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <initiatives[activeTab].icon size={24} />
                <span className="font-semibold">{initiatives[activeTab].title}</span>
              </motion.div>

              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {initiatives[activeTab].description}
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Highlights:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {initiatives[activeTab].highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${initiatives[activeTab].color} rounded-full`} />
                      <span className="text-gray-700">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`relative h-96 bg-gradient-to-br ${initiatives[activeTab].color} rounded-2xl flex items-center justify-center overflow-hidden`}>
                <motion.div
                  className="text-center text-white"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <initiatives[activeTab].icon size={80} className="mx-auto mb-4 opacity-20" />
                  <h3 className="text-2xl font-bold opacity-90">{initiatives[activeTab].title}</h3>
                </motion.div>
                
                {/* Floating Elements */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InitiativesSection;

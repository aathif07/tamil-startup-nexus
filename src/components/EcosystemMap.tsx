
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Calendar, DollarSign, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EcosystemMap = () => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const mapData = [
    {
      id: 1,
      type: 'incubator',
      name: 'Chennai Innovation Hub',
      location: 'Chennai',
      description: 'Premier incubation facility supporting 100+ startups',
      coordinates: { x: 45, y: 60 },
      icon: Building,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'startup',
      name: 'TechFlow Solutions',
      location: 'Coimbatore',
      description: 'AI-driven logistics optimization platform',
      coordinates: { x: 25, y: 45 },
      icon: MapPin,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'event',
      name: 'Startup Summit 2024',
      location: 'Madurai',
      description: 'Annual entrepreneurship conference',
      coordinates: { x: 35, y: 75 },
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'investor',
      name: 'India Venture Fund',
      location: 'Chennai',
      description: 'Early-stage venture capital fund',
      coordinates: { x: 50, y: 55 },
      icon: DollarSign,
      color: 'bg-red-500'
    },
    {
      id: 5,
      type: 'startup',
      name: 'AgriTech Innovations',
      location: 'Salem',
      description: 'Smart farming solutions for rural communities',
      coordinates: { x: 30, y: 35 },
      icon: MapPin,
      color: 'bg-green-500'
    }
  ];

  return (
    <section id="startup-ecosystem" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Startup Ecosystem Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the vibrant startup ecosystem across India
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Map Background */}
          <motion.div
            className="relative h-96 md:h-[500px] bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden border-4 border-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* India Map Outline */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-red-200/30">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                <path
                  d="M20,20 Q30,15 40,25 Q50,20 60,30 Q70,25 80,35 L75,50 Q70,60 60,65 Q50,70 40,65 Q30,60 25,50 L20,35 Z"
                  fill="currentColor"
                  className="text-blue-500"
                />
              </svg>
            </div>

            {/* Interactive Markers */}
            {mapData.map((marker, index) => (
              <motion.div
                key={marker.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${marker.coordinates.x}%`,
                  top: `${marker.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedMarker(marker)}
              >
                <div className={`w-8 h-8 ${marker.color} rounded-full flex items-center justify-center text-white shadow-lg relative`}>
                  <marker.icon size={16} />
                  <motion.div
                    className={`absolute inset-0 ${marker.color} rounded-full`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Incubators</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Startups</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Investors</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modal for selected marker */}
          {selectedMarker && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMarker(null)}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${selectedMarker.color} rounded-full flex items-center justify-center text-white`}>
                    <selectedMarker.icon size={24} />
                  </div>
                  <button
                    onClick={() => setSelectedMarker(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedMarker.name}
                </h3>
                <p className="text-gray-600 mb-2">{selectedMarker.location}</p>
                <p className="text-gray-700 mb-4">{selectedMarker.description}</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EcosystemMap;

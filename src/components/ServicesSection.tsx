
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, DollarSign, Calendar, Lightbulb, FileText } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: 'Startup Support & Mentorship',
      description: 'Connect with experienced mentors and receive guidance on business strategy, product development, and market entry.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Incubation & Acceleration',
      description: 'Comprehensive incubation programs designed to accelerate your startup journey from idea to market.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      title: 'Funding & Grants',
      description: 'Access to various funding opportunities, government grants, and investor networks to fuel your growth.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Networking Events',
      description: 'Regular events, workshops, and conferences to connect with fellow entrepreneurs and industry experts.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Labs',
      description: 'State-of-the-art facilities and resources for research, development, and prototyping your innovative ideas.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: FileText,
      title: 'Startup Policy Guidance',
      description: 'Expert guidance on government policies, compliance requirements, and regulatory frameworks for startups.',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support ecosystem designed to nurture and accelerate startup growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 relative z-10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <service.icon size={32} className="text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* 3D Shadow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-20 blur-xl transform translate-y-4 group-hover:translate-y-6 transition-transform duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

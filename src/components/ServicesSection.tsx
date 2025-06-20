import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, DollarSign, Calendar, Building, Globe } from 'lucide-react';

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleApplyNowClick = () => {
    navigate('/startup-incorporation');
  };

  const services = [
    {
      icon: Building,
      title: 'Startup Incorporation',
      description: 'Complete startup incorporation services including company registration, legal documentation, and compliance setup.',
      price: '₹15,000',
      color: 'from-red-500 to-pink-500',
      features: ['Company Registration', 'Legal Documentation', 'Compliance Setup', 'Tax Registration'],
      isSpecial: true
    },
    {
      icon: Globe,
      title: 'Website Development & Maintenance',
      description: 'Professional website development and ongoing maintenance services tailored for startups and businesses.',
      price: 'Get Quote',
      color: 'from-blue-500 to-cyan-500',
      features: ['Custom Design', 'Responsive Layout', 'SEO Optimization', 'Ongoing Support']
    },
    {
      icon: Users,
      title: 'Startup Support & Mentorship',
      description: 'Connect with experienced mentors and receive guidance on business strategy, product development, and market entry.',
      price: 'Free Consultation',
      color: 'from-green-500 to-emerald-500',
      features: ['1-on-1 Mentoring', 'Business Strategy', 'Market Analysis', 'Growth Planning']
    },
    {
      icon: Zap,
      title: 'Incubation & Acceleration',
      description: 'Comprehensive incubation programs designed to accelerate your startup journey from idea to market.',
      price: 'Program Based',
      color: 'from-purple-500 to-violet-500',
      features: ['3-6 Month Programs', 'Workspace Access', 'Expert Guidance', 'Demo Day']
    },
    {
      icon: DollarSign,
      title: 'Funding & Grants',
      description: 'Access to various funding opportunities, government grants, and investor networks to fuel your growth.',
      price: 'Success Fee',
      color: 'from-orange-500 to-amber-500',
      features: ['Investor Connect', 'Grant Applications', 'Pitch Preparation', 'Due Diligence']
    },
    {
      icon: Calendar,
      title: 'Networking Events',
      description: 'Regular events, workshops, and conferences to connect with fellow entrepreneurs and industry experts.',
      price: 'Free - ₹2,000',
      color: 'from-indigo-500 to-blue-500',
      features: ['Monthly Meetups', 'Workshops', 'Conferences', 'Online Events']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support ecosystem designed to nurture and accelerate startup growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                <service.icon size={32} className="text-white" />
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <span className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    {service.price}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-2`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {service.title === 'Startup Incorporation' ? (
                  <button
                    onClick={handleApplyNowClick}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-lg font-bold hover:from-red-600 hover:to-pink-600 transition-colors"
                  >
                    Apply Now
                  </button>
                ) : (
                  <button 
                    className={`w-full bg-gradient-to-r ${service.color} text-white py-3 px-4 rounded-lg font-bold hover:opacity-90 transition-opacity`}
                    onClick={() => alert(`${service.title} service coming soon!`)}
                  >
                    {service.price === 'Get Quote' ? 'Get Your Price' : 
                     service.price === 'Free Consultation' ? 'Book Consultation' : 
                     'Learn More'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Special Package Deals
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white">
                <h4 className="text-xl font-semibold mb-2">Startup Complete Package</h4>
                <p className="mb-3">Incorporation + Website Development</p>
                <div className="text-2xl font-bold">₹25,000 <span className="text-sm line-through opacity-75">₹35,000</span></div>
                <button
                  onClick={handleApplyNowClick}
                  className="mt-4 bg-white text-red-500 hover:bg-gray-100 py-2 px-4 rounded font-medium transition-colors"
                >
                  Get Started
                </button>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                <h4 className="text-xl font-semibold mb-2">Growth Package</h4>
                <p className="mb-3">Website + 6 Months Maintenance + Mentorship</p>
                <div className="text-2xl font-bold">Contact Us</div>
                <button 
                  className="mt-4 bg-white text-blue-500 hover:bg-gray-100 py-2 px-4 rounded font-medium transition-colors"
                  onClick={() => alert('Growth package contact form coming soon!')}
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

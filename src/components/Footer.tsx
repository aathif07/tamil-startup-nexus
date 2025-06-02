
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Initiatives', href: '#initiatives' }
    ],
    'Support': [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Help Center', href: '#help' }
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Disclaimer', href: '#disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, url: '#', color: 'hover:bg-blue-600' },
    { icon: Twitter, url: '#', color: 'hover:bg-sky-500' },
    { icon: Youtube, url: '#', color: 'hover:bg-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-1"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SD</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                  STARTUP DOTIN
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering India's startup ecosystem through innovation, 
                mentorship, and comprehensive support for entrepreneurs.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail size={16} />
                  <span className="text-sm">hello@startupdontin.gov.in</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone size={16} />
                  <span className="text-sm">+91 44 2345 6789</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={16} />
                  <span className="text-sm">Chennai, India</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-700 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-300 text-sm">
                © 2024 Startup Dotin. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Government of India Initiative
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 ${social.color} hover:text-white hover:scale-110`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-6 h-6 bg-red-400 rounded-full opacity-40"
        animate={{
          y: [20, -20, 20],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
};

export default Footer;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ChevronDown, ChevronRight, BookOpen, Scale, Briefcase, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResourcesSection = () => {
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const resourceCategories = [
    {
      id: 0,
      title: 'Government Policies',
      icon: Scale,
      description: 'Comprehensive policy documents and guidelines',
      color: 'from-blue-500 to-cyan-500',
      resources: [
        { name: 'Tamil Nadu Startup Policy 2024', type: 'PDF', size: '2.5 MB' },
        { name: 'Intellectual Property Guidelines', type: 'PDF', size: '1.8 MB' },
        { name: 'Tax Benefits for Startups', type: 'PDF', size: '1.2 MB' },
        { name: 'Regulatory Compliance Checklist', type: 'PDF', size: '950 KB' }
      ]
    },
    {
      id: 1,
      title: 'Startup Toolkit',
      icon: Briefcase,
      description: 'Essential tools and resources for entrepreneurs',
      color: 'from-green-500 to-emerald-500',
      resources: [
        { name: 'Business Plan Template', type: 'DOCX', size: '1.5 MB' },
        { name: 'Financial Projection Calculator', type: 'XLSX', size: '800 KB' },
        { name: 'Pitch Deck Template', type: 'PPTX', size: '3.2 MB' },
        { name: 'Market Research Framework', type: 'PDF', size: '2.1 MB' }
      ]
    },
    {
      id: 2,
      title: 'Templates & Forms',
      icon: FileText,
      description: 'Ready-to-use templates and legal forms',
      color: 'from-purple-500 to-violet-500',
      resources: [
        { name: 'Incorporation Documents', type: 'PDF', size: '1.7 MB' },
        { name: 'Employee Agreement Template', type: 'DOCX', size: '600 KB' },
        { name: 'NDA Template', type: 'DOCX', size: '400 KB' },
        { name: 'Partnership Agreement', type: 'PDF', size: '1.1 MB' }
      ]
    },
    {
      id: 3,
      title: 'Learning Resources',
      icon: BookOpen,
      description: 'Educational content and training materials',
      color: 'from-orange-500 to-amber-500',
      resources: [
        { name: 'Entrepreneurship Handbook', type: 'PDF', size: '4.5 MB' },
        { name: 'Digital Marketing Guide', type: 'PDF', size: '3.1 MB' },
        { name: 'Financial Management Basics', type: 'PDF', size: '2.8 MB' },
        { name: 'Leadership Development Guide', type: 'PDF', size: '2.3 MB' }
      ]
    }
  ];

  const toggleSection = (sectionId: number) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <section id="resources" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Resources & Downloads
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive resources to support your entrepreneurial journey
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Section Header */}
              <motion.div
                className="bg-white rounded-t-2xl shadow-lg border border-gray-200 cursor-pointer"
                onClick={() => toggleSection(category.id)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                        <category.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {category.title}
                        </h3>
                        <p className="text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openSections.includes(category.id) ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={24} className="text-gray-400" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Section Content */}
              <AnimatePresence>
                {openSections.includes(category.id) && (
                  <motion.div
                    className="bg-white rounded-b-2xl shadow-lg border-x border-b border-gray-200 border-t-0"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0">
                      <div className="grid gap-4">
                        {category.resources.map((resource, resourceIndex) => (
                          <motion.div
                            key={resource.name}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: resourceIndex * 0.1 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <FileText size={20} className="text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  {resource.name}
                                </h4>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <span>{resource.type}</span>
                                  <span>•</span>
                                  <span>{resource.size}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className={`bg-gradient-to-r ${category.color} text-white hover:opacity-90`}
                            >
                              <Download size={16} className="mr-2" />
                              Download
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Quick Access Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <Lightbulb className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need Personalized Guidance?
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with our expert consultants for customized support and resources
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white px-8 py-3 rounded-full"
            >
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection;

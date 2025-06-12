
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, CheckCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CertificationStatus = () => {
  const certifications = [
    {
      id: 1,
      name: 'Innovation Excellence Certificate',
      status: 'approved',
      submittedDate: '2024-02-15',
      approvedDate: '2024-03-01',
      type: 'Technology Innovation',
      validUntil: '2025-03-01'
    },
    {
      id: 2,
      name: 'Startup Readiness Certificate',
      status: 'under_review',
      submittedDate: '2024-03-10',
      type: 'Business Readiness',
      estimatedCompletion: '2024-03-25'
    },
    {
      id: 3,
      name: 'Sustainability Certificate',
      status: 'pending',
      submittedDate: '2024-03-12',
      type: 'Environmental Impact',
      estimatedCompletion: '2024-04-01'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'under_review':
        return <Clock className="text-blue-500" size={20} />;
      case 'pending':
        return <FileText className="text-yellow-500" size={20} />;
      default:
        return <FileText className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applied</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">1</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">My Certifications</h3>
        
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(cert.status)}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.type}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          Submitted: {cert.submittedDate}
                        </span>
                        {cert.status === 'approved' && cert.approvedDate && (
                          <span className="text-xs text-gray-500">
                            Approved: {cert.approvedDate}
                          </span>
                        )}
                        {cert.estimatedCompletion && (
                          <span className="text-xs text-gray-500">
                            Est. Completion: {cert.estimatedCompletion}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(cert.status)}`}>
                      {cert.status.replace('_', ' ')}
                    </span>
                    
                    {cert.status === 'approved' && (
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
                
                {cert.status === 'approved' && cert.validUntil && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <Award size={16} className="inline mr-2" />
                      Certificate valid until: {cert.validUntil}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Apply for New Certification */}
      <Card>
        <CardHeader>
          <CardTitle>Apply for New Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Digital Innovation Certificate', description: 'For technology-driven innovations' },
              { name: 'Sustainable Business Certificate', description: 'For environmentally conscious startups' },
              { name: 'Export Readiness Certificate', description: 'For startups ready to export' }
            ].map((cert, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationStatus;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Eye, CheckCircle, XCircle, Clock, Phone, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface IncorporationApplication {
  applicationId: string;
  companyName: string;
  businessType: string;
  industry: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress';
  submittedAt: string;
  estimatedCompletion: string;
  authorizedCapital: string;
  paidUpCapital: string;
  founders: string;
  [key: string]: any;
}

const StartupIncorporationManagement = () => {
  const [applications, setApplications] = useState<IncorporationApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<IncorporationApplication | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  useEffect(() => {
    // Load applications from localStorage
    const savedApplications = JSON.parse(localStorage.getItem('incorporationApplications') || '[]');
    setApplications(savedApplications);
  }, []);

  const updateApplicationStatus = (applicationId: string, newStatus: 'approved' | 'rejected' | 'in-progress') => {
    const updatedApplications = applications.map(app => 
      app.applicationId === applicationId 
        ? { ...app, status: newStatus }
        : app
    );
    
    setApplications(updatedApplications);
    localStorage.setItem('incorporationApplications', JSON.stringify(updatedApplications));
    
    if (selectedApplication && selectedApplication.applicationId === applicationId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      case 'in-progress': return <Building size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (viewMode === 'detail' && selectedApplication) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => {
              setViewMode('list');
              setSelectedApplication(null);
            }}
          >
            ← Back to Applications
          </Button>
          <Badge className={getStatusColor(selectedApplication.status)}>
            {getStatusIcon(selectedApplication.status)}
            <span className="ml-1 capitalize">{selectedApplication.status}</span>
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building size={24} />
              <span>{selectedApplication.companyName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                <div className="space-y-2">
                  <p><strong>Application ID:</strong> {selectedApplication.applicationId}</p>
                  <p><strong>Business Type:</strong> {selectedApplication.businessType}</p>
                  <p><strong>Industry:</strong> {selectedApplication.industry}</p>
                  <p><strong>Number of Founders:</strong> {selectedApplication.founders}</p>
                  <p><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p className="flex items-center space-x-2">
                    <span><strong>Contact Person:</strong> {selectedApplication.contactPerson}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>{selectedApplication.phoneNumber}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{selectedApplication.email}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Preferred Completion: {selectedApplication.preferredCompletionDate || 'Not specified'}</span>
                  </p>
                </div>
              </div>

              {/* Capital Structure */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Capital Structure</h3>
                <div className="space-y-2">
                  <p><strong>Authorized Capital:</strong> ₹{selectedApplication.authorizedCapital}</p>
                  <p><strong>Paid-up Capital:</strong> ₹{selectedApplication.paidUpCapital}</p>
                  <p><strong>Number of Directors:</strong> {selectedApplication.numberOfDirectors}</p>
                  <p><strong>Estimated Turnover:</strong> ₹{selectedApplication.estimatedTurnover || 'Not specified'}</p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Additional Details</h3>
                <div className="space-y-2">
                  <p><strong>GST Required:</strong> {selectedApplication.gstRequired}</p>
                  <p><strong>Banking Partner:</strong> {selectedApplication.bankingPartner || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Full Width Sections */}
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Business Description</h3>
                <p className="text-gray-700">{selectedApplication.businessDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Registered Address</h3>
                <p className="text-gray-700">{selectedApplication.registeredAddress}</p>
              </div>

              {selectedApplication.businessAddress && (
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-3">Business Address</h3>
                  <p className="text-gray-700">{selectedApplication.businessAddress}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Director Details</h3>
                <p className="text-gray-700">{selectedApplication.directorDetails}</p>
              </div>

              {selectedApplication.additionalServices && (
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-3">Additional Services</h3>
                  <p className="text-gray-700">{selectedApplication.additionalServices}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => updateApplicationStatus(selectedApplication.applicationId, 'approved')}
                className="bg-green-600 hover:bg-green-700"
                disabled={selectedApplication.status === 'approved'}
              >
                <CheckCircle size={16} className="mr-2" />
                Approve
              </Button>
              
              <Button
                onClick={() => updateApplicationStatus(selectedApplication.applicationId, 'in-progress')}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={selectedApplication.status === 'in-progress'}
              >
                <Building size={16} className="mr-2" />
                Mark In Progress
              </Button>
              
              <Button
                onClick={() => updateApplicationStatus(selectedApplication.applicationId, 'rejected')}
                variant="destructive"
                disabled={selectedApplication.status === 'rejected'}
              >
                <XCircle size={16} className="mr-2" />
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Startup Incorporation Applications</h2>
        <Badge variant="secondary">{applications.length} Total Applications</Badge>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Building size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Applications Yet</h3>
            <p className="text-gray-500">Startup incorporation applications will appear here when submitted.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((application, index) => (
            <motion.div
              key={application.applicationId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Building size={20} className="text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {application.companyName}
                        </h3>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <p><strong>Type:</strong> {application.businessType}</p>
                        <p><strong>Industry:</strong> {application.industry}</p>
                        <p><strong>Contact:</strong> {application.contactPerson}</p>
                        <p><strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedApplication(application);
                          setViewMode('detail');
                        }}
                      >
                        <Eye size={16} className="mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartupIncorporationManagement;

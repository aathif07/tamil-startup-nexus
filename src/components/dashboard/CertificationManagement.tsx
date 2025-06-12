
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CertificationManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const certifications = [
    {
      id: 1,
      applicant: 'TechCorp India',
      type: 'Innovation Certificate',
      submittedDate: '2024-03-15',
      status: 'pending',
      reviewer: 'Unassigned'
    },
    {
      id: 2,
      applicant: 'GreenTech Solutions',
      type: 'Sustainability Certificate',
      submittedDate: '2024-03-10',
      status: 'approved',
      reviewer: 'Dr. Kumar'
    },
    {
      id: 3,
      applicant: 'FinTech Innovations',
      type: 'Technology Certificate',
      submittedDate: '2024-03-08',
      status: 'rejected',
      reviewer: 'Ms. Sharma'
    },
    {
      id: 4,
      applicant: 'HealthTech Pro',
      type: 'Medical Innovation',
      submittedDate: '2024-03-12',
      status: 'under_review',
      reviewer: 'Dr. Patel'
    }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    under_review: 'bg-blue-100 text-blue-800'
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle,
    under_review: Eye
  };

  const filteredCertifications = selectedStatus === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                </div>
                <Clock className="text-yellow-600" size={24} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-blue-600">15</p>
                </div>
                <Eye className="text-blue-600" size={24} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">142</p>
                </div>
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">8</p>
                </div>
                <XCircle className="text-red-600" size={24} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Certification Management Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Certification Applications</CardTitle>
            <div className="flex space-x-2">
              {['all', 'pending', 'under_review', 'approved', 'rejected'].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Certificate Type</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertifications.map((cert) => {
                const StatusIcon = statusIcons[cert.status as keyof typeof statusIcons];
                return (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.applicant}</TableCell>
                    <TableCell>{cert.type}</TableCell>
                    <TableCell>{cert.submittedDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <StatusIcon size={16} />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[cert.status as keyof typeof statusColors]}`}>
                          {cert.status.replace('_', ' ')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{cert.reviewer}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {cert.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-600">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationManagement;

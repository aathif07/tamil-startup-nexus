import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const StartupIncorporation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    industry: '',
    founders: '',
    registeredAddress: '',
    businessAddress: '',
    authorizedCapital: '',
    paidUpCapital: '',
    businessDescription: '',
    numberOfDirectors: '',
    directorDetails: '',
    businessPlan: '',
    estimatedTurnover: '',
    bankingPartner: '',
    gstRequired: 'yes',
    additionalServices: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    preferredCompletionDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate application ID
      const applicationId = `INC-${Date.now()}`;
      
      // Create incorporation application object for Firebase
      const applicationData = {
        ...formData,
        applicationId,
        status: 'pending',
        submittedAt: serverTimestamp(),
        estimatedCompletion: formData.preferredCompletionDate || 'TBD',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // Convert string numbers to actual numbers for better querying
        founders: formData.founders ? parseInt(formData.founders) : 0,
        numberOfDirectors: formData.numberOfDirectors ? parseInt(formData.numberOfDirectors) : 0,
        authorizedCapital: formData.authorizedCapital ? parseFloat(formData.authorizedCapital) : 0,
        paidUpCapital: formData.paidUpCapital ? parseFloat(formData.paidUpCapital) : 0,
        estimatedTurnover: formData.estimatedTurnover ? parseFloat(formData.estimatedTurnover) : 0,
      };

      console.log('Submitting to Firebase:', applicationData);

      // Add document to Firebase Firestore
      const docRef = await addDoc(collection(db, 'incorporationApplications'), applicationData);
      
      console.log('Document written with ID: ', docRef.id);

      // Show success message with application ID
      alert(`Your startup incorporation application has been submitted successfully!

Application ID: ${applicationId}
Document ID: ${docRef.id}

Our team will contact you within 24 hours to proceed with the incorporation process.`);
      
      // Navigate back to home page
      navigate('/');
      
    } catch (error) {
      console.error('Error adding document: ', error);
      
      // More specific error handling
      let errorMessage = 'There was an error submitting your application. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          errorMessage = 'Permission denied. Please check your Firebase security rules.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('unavailable')) {
          errorMessage = 'Service temporarily unavailable. Please try again in a few moments.';
        }
        console.error('Detailed error:', error.message);
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="text-white" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Startup Incorporation Application
            </h1>
            <p className="text-gray-600 text-lg">
              Complete the form below to start your company registration process
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-800">Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Company Name *</label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Business Type *</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select business type</option>
                      <option value="Private Limited">Private Limited Company</option>
                      <option value="LLP">Limited Liability Partnership</option>
                      <option value="Partnership">Partnership Firm</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="OPC">One Person Company</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Industry *</label>
                    <Input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g., Technology, Healthcare, E-commerce"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Number of Founders *</label>
                    <Input
                      type="number"
                      name="founders"
                      value={formData.founders}
                      onChange={handleChange}
                      placeholder="Enter number of founders"
                      required
                      disabled={loading}
                      min="1"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Address Information</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Registered Office Address *</label>
                    <Textarea
                      name="registeredAddress"
                      value={formData.registeredAddress}
                      onChange={handleChange}
                      placeholder="Enter complete registered address"
                      required
                      disabled={loading}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Business Address (if different)</label>
                    <Textarea
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      placeholder="Enter business address"
                      disabled={loading}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Capital Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Capital Structure</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Authorized Capital (₹) *</label>
                      <Input
                        type="number"
                        name="authorizedCapital"
                        value={formData.authorizedCapital}
                        onChange={handleChange}
                        placeholder="e.g., 100000"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Paid-up Capital (₹) *</label>
                      <Input
                        type="number"
                        name="paidUpCapital"
                        value={formData.paidUpCapital}
                        onChange={handleChange}
                        placeholder="e.g., 50000"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Business Details</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Business Description *</label>
                    <Textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleChange}
                      placeholder="Describe your business activities and objectives"
                      required
                      disabled={loading}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Number of Directors *</label>
                      <Input
                        type="number"
                        name="numberOfDirectors"
                        value={formData.numberOfDirectors}
                        onChange={handleChange}
                        placeholder="Enter number of directors"
                        required
                        disabled={loading}
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Estimated Annual Turnover (₹)</label>
                      <Input
                        type="number"
                        name="estimatedTurnover"
                        value={formData.estimatedTurnover}
                        onChange={handleChange}
                        placeholder="e.g., 1000000"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Director Details *</label>
                    <Textarea
                      name="directorDetails"
                      value={formData.directorDetails}
                      onChange={handleChange}
                      placeholder="Provide names, PAN numbers, and Aadhaar numbers of all directors"
                      required
                      disabled={loading}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Preferred Banking Partner</label>
                      <Input
                        type="text"
                        name="bankingPartner"
                        value={formData.bankingPartner}
                        onChange={handleChange}
                        placeholder="e.g., HDFC, ICICI, SBI"
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">GST Registration Required? *</label>
                      <select
                        name="gstRequired"
                        value={formData.gstRequired}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="later">Will apply later</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Preferred Completion Date</label>
                    <Input
                      type="date"
                      name="preferredCompletionDate"
                      value={formData.preferredCompletionDate}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Additional Services Required</label>
                    <Textarea
                      name="additionalServices"
                      value={formData.additionalServices}
                      onChange={handleChange}
                      placeholder="e.g., Trademark registration, Digital signature, Website development"
                      disabled={loading}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Contact Person Name *</label>
                      <Input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Enter contact person name"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                      <Input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white py-3 text-lg"
                  >
                    {loading ? (
                      'Submitting Application...'
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Please ensure all information provided is accurate. Our team will verify the details and contact you within 24 hours to proceed with the incorporation process.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StartupIncorporation;

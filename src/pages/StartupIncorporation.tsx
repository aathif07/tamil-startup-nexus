
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
    studentName: '',
    roleNumber: '',
    schoolOfStudy: '',
    contactNumber: '',
    director1PanCard: '',
    director2PanCard: '',
    director1Identity: '',
    director2Identity: '',
    director1Mobile: '',
    director1Email: '',
    director2Mobile: '',
    director2Email: '',
    companyNames: '',
    businessNature: '',
    director1AddressProof: '',
    director2AddressProof: '',
    businessPlaceProof: '',
    nocFromOwner: '',
    shareCapital: '',
    shareBreakup: '',
    companyAddress: ''
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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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
              <CardTitle className="text-2xl text-center text-gray-800">Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Student Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Student Name *</label>
                      <Input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Enter student name"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Role Number *</label>
                      <Input
                        type="text"
                        name="roleNumber"
                        value={formData.roleNumber}
                        onChange={handleChange}
                        placeholder="Enter role number"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">School of Study *</label>
                      <Input
                        type="text"
                        name="schoolOfStudy"
                        value={formData.schoolOfStudy}
                        onChange={handleChange}
                        placeholder="Enter school of study"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Contact Number / Mobile Number *</label>
                      <Input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Director 1 Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Director 1 Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">PAN CARD of Director 1 *</label>
                      <Input
                        type="text"
                        name="director1PanCard"
                        value={formData.director1PanCard}
                        onChange={handleChange}
                        placeholder="Enter PAN card details"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Aadhar card or Driving license of Director 1 *</label>
                      <Input
                        type="text"
                        name="director1Identity"
                        value={formData.director1Identity}
                        onChange={handleChange}
                        placeholder="Enter Aadhar or DL details"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Director 1 Mobile number *</label>
                      <Input
                        type="tel"
                        name="director1Mobile"
                        value={formData.director1Mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Director 1 email id *</label>
                      <Input
                        type="email"
                        name="director1Email"
                        value={formData.director1Email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Address Proof - Bank Statement or Electricity Bill (Latest Month) of Director 1 *</label>
                    <Input
                      type="text"
                      name="director1AddressProof"
                      value={formData.director1AddressProof}
                      onChange={handleChange}
                      placeholder="Enter address proof details"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Director 2 Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Director 2 Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">PAN CARD of Director 2 *</label>
                      <Input
                        type="text"
                        name="director2PanCard"
                        value={formData.director2PanCard}
                        onChange={handleChange}
                        placeholder="Enter PAN card details"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Aadhar card or Driving license of Director 2 *</label>
                      <Input
                        type="text"
                        name="director2Identity"
                        value={formData.director2Identity}
                        onChange={handleChange}
                        placeholder="Enter Aadhar or DL details"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Director 2 Mobile number *</label>
                      <Input
                        type="tel"
                        name="director2Mobile"
                        value={formData.director2Mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Director 2 email id *</label>
                      <Input
                        type="email"
                        name="director2Email"
                        value={formData.director2Email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Address Proof - Bank Statement or Electricity Bill (Latest Month) of Director 2 *</label>
                    <Input
                      type="text"
                      name="director2AddressProof"
                      value={formData.director2AddressProof}
                      onChange={handleChange}
                      placeholder="Enter address proof details"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Company Information</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Suggest three company names *</label>
                    <Textarea
                      name="companyNames"
                      value={formData.companyNames}
                      onChange={handleChange}
                      placeholder="Example: ALE Private Limited, TEX Private Limited, BEN Technologies Private Limited"
                      required
                      disabled={loading}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">NATURE BUSINESS WITH BRIEF ABOUT ACTIVITIES *</label>
                    <Textarea
                      name="businessNature"
                      value={formData.businessNature}
                      onChange={handleChange}
                      placeholder="Describe your business nature and activities"
                      required
                      disabled={loading}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Address of the company *</label>
                    <Textarea
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      placeholder="Enter complete company address"
                      required
                      disabled={loading}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Business Place and Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Business Place & Documents</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Latest Electricity Bill (Less than 30 days) PROOF FOR PLACE OF BUSINESS *</label>
                    <Input
                      type="text"
                      name="businessPlaceProof"
                      value={formData.businessPlaceProof}
                      onChange={handleChange}
                      placeholder="Enter electricity bill details"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">NOC signed from the owner - Content will be given</label>
                    <Input
                      type="text"
                      name="nocFromOwner"
                      value={formData.nocFromOwner}
                      onChange={handleChange}
                      placeholder="Enter NOC details"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Capital and Share Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Capital & Share Structure</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SHARE CAPITAL - AUTHORIZED CAPITAL & PAID UP CAPITAL *</label>
                    <Textarea
                      name="shareCapital"
                      value={formData.shareCapital}
                      onChange={handleChange}
                      placeholder="Minimum Rs 10,000/- to Maximum Rs 1,00,000/- amount to be paid in your company bank account after incorporation as your paid up capital."
                      required
                      disabled={loading}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SHARE BREAKUP OF DIRECTORS AND SHARE HOLDERS *</label>
                    <Textarea
                      name="shareBreakup"
                      value={formData.shareBreakup}
                      onChange={handleChange}
                      placeholder="Example: Director 1- 51%, Director 2-49%"
                      required
                      disabled={loading}
                      className="min-h-[80px]"
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

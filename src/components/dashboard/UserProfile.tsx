
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@startup.com',
    phone: '+91 9876543210',
    company: 'TechCorp India',
    position: 'Founder & CEO',
    website: 'https://techcorp.in',
    address: 'Chennai, Tamil Nadu',
    bio: 'Passionate entrepreneur focused on building innovative technology solutions for emerging markets.'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
    console.log('Saving profile data:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                <p className="text-gray-600">{formData.position}</p>
                <p className="text-sm text-gray-500">{formData.company}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} variant="default">
                    <Save size={16} className="mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X size={16} className="mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              {isEditing ? (
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900">{formData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-500" />
                  <p className="text-gray-900">{formData.email}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              {isEditing ? (
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-500" />
                  <p className="text-gray-900">{formData.phone}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              {isEditing ? (
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900">{formData.address}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              {isEditing ? (
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Building size={16} className="text-gray-500" />
                  <p className="text-gray-900">{formData.company}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Position</label>
              {isEditing ? (
                <Input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900">{formData.position}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Website</label>
              {isEditing ? (
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              ) : (
                <a 
                  href={formData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {formData.website}
                </a>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.bio}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">2</p>
              <p className="text-sm text-gray-600">Certifications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-sm text-gray-600">Applications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">28</p>
              <p className="text-sm text-gray-600">Days Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">95%</p>
              <p className="text-sm text-gray-600">Profile Complete</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;

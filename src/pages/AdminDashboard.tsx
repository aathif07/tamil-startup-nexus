
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Settings, BarChart3, FileText, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import UserManagement from '@/components/dashboard/UserManagement';
import AdminStats from '@/components/dashboard/AdminStats';
import CertificationManagement from '@/components/dashboard/CertificationManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'certifications', label: 'Certifications', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats />;
      case 'users':
        return <UserManagement />;
      case 'certifications':
        return <CertificationManagement />;
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Admin settings and configuration options coming soon...</p>
            </CardContent>
          </Card>
        );
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between p-4 lg:p-6 border-b">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs lg:text-sm">SD</span>
            </div>
            <h1 className="text-base lg:text-lg font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-4 lg:mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 lg:px-6 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-red-50 text-red-600 border-r-2 border-red-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm lg:text-base">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center space-x-2 text-sm"
            size="sm"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </Button>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu size={18} />
              </button>
              <h2 className="text-lg lg:text-2xl font-bold text-gray-800 truncate">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <span className="text-xs lg:text-sm text-gray-600 hidden sm:inline">Welcome, Admin</span>
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-red-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

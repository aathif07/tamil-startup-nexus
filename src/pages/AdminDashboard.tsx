import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building, 
  TrendingUp, 
  Calendar,
  Eye,
  Download,
  Filter,
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  Home,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  UserCheck,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface IncorporationApplication {
  id: string;
  applicationId: string;
  companyName: string;
  businessType: string;
  industry: string;
  founders: number;
  registeredAddress: string;
  businessAddress: string;
  authorizedCapital: number;
  paidUpCapital: number;
  businessDescription: string;
  numberOfDirectors: number;
  directorDetails: string;
  estimatedTurnover: number;
  bankingPartner: string;
  gstRequired: string;
  additionalServices: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  preferredCompletionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress' | 'completed';
  submittedAt: any;
  createdAt: any;
  updatedAt: any;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<IncorporationApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<IncorporationApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sidebar menu items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Fetch applications from Firebase
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting to fetch applications from Firebase...');
      
      const applicationsRef = collection(db, 'incorporationApplications');
      console.log('Collection reference created');
      
      const q = query(applicationsRef, orderBy('submittedAt', 'desc'));
      console.log('Query created');
      
      const querySnapshot = await getDocs(q);
      console.log('Query executed, snapshot received:', querySnapshot);
      console.log('Number of documents:', querySnapshot.size);
      
      const fetchedApplications: IncorporationApplication[] = [];
      
      querySnapshot.forEach((doc) => {
        console.log('Processing document:', doc.id, doc.data());
        const data = doc.data();
        
        fetchedApplications.push({
          id: doc.id,
          applicationId: data.applicationId || doc.id,
          
          // Handle both old and new data formats
          companyName: data.companyName || 
                       (data.companyNames ? data.companyNames.split(',')[0]?.trim() : '') || 
                       'Company Name Not Provided',
          
          businessType: data.businessType || 'Private Limited Company',
          
          industry: data.industry || 
                    data.businessNature || 
                    'Industry Not Specified',
          
          contactPerson: data.contactPerson || 
                         data.studentName || 
                         'Contact Person Not Provided',
          
          email: data.email || 
                 data.director1Email || 
                 data.userEmail || 
                 'Email Not Provided',
          
          phoneNumber: data.phoneNumber || 
                       data.director1Mobile || 
                       data.contactNumber || 
                       'Phone Not Provided',
          
          // Rest of the fields
          founders: parseInt(data.founders?.toString() || '2') || 2,
          registeredAddress: data.registeredAddress || 
                            data.companyAddress || 
                            'Address Not Provided',
          businessAddress: data.businessAddress || data.companyAddress || '',
          authorizedCapital: parseInt(data.authorizedCapital?.toString() || data.shareCapital?.toString() || '100000') || 100000,
          paidUpCapital: parseInt(data.paidUpCapital?.toString() || data.shareCapital?.toString() || '50000') || 50000,
          businessDescription: data.businessDescription || 
                              data.businessNature || 
                              'Business Description Not Provided',
          numberOfDirectors: parseInt(data.numberOfDirectors?.toString() || '2') || 2,
          directorDetails: data.directorDetails || 
                          `Director 1: ${data.director1PanCard || 'N/A'}, Director 2: ${data.director2PanCard || 'N/A'}`,
          estimatedTurnover: parseInt(data.estimatedTurnover?.toString() || '0') || 0,
          bankingPartner: data.bankingPartner || 'Not specified',
          gstRequired: data.gstRequired || 'yes',
          additionalServices: data.additionalServices || 'None',
          preferredCompletionDate: data.preferredCompletionDate || '',
          status: data.status || 'pending',
          submittedAt: data.submittedAt || new Date().toISOString(),
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
          userId: data.userId || '',
          userName: data.userName || data.studentName || '',
          userEmail: data.userEmail || data.director1Email || ''
        });
      });
      
      console.log('Final fetched applications:', fetchedApplications);
      setApplications(fetchedApplications);
      
      if (fetchedApplications.length === 0) {
        console.log('No applications found in database');
      }
      
    } catch (error) {
      console.error('Detailed error fetching applications:', error);
      setError(`Failed to load applications: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setApplications([]);
    } finally {
      setLoading(false);
      console.log('Fetch process completed');
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      console.log(`Updating application ${applicationId} to status: ${newStatus}`);
      
      // Find the application document
      const application = applications.find(app => app.applicationId === applicationId || app.id === applicationId);
      if (!application) {
        alert('Application not found');
        return;
      }
      
      // Update in Firebase
      const docRef = doc(db, 'incorporationApplications', application.id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          (app.applicationId === applicationId || app.id === applicationId)
            ? { ...app, status: newStatus as any, updatedAt: new Date().toISOString() }
            : app
        )
      );
      
      alert(`Application status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status in Firebase:', error);
      alert('Error updating application status');
    }
  };

  // Delete application
  const deleteApplication = async (applicationId: string, companyName: string) => {
    if (!confirm(`Are you sure you want to delete the application for "${companyName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log(`Deleting application ${applicationId}`);
      
      // Find the application document
      const application = applications.find(app => app.applicationId === applicationId || app.id === applicationId);
      if (!application) {
        alert('Application not found');
        return;
      }
      
      // Delete from Firebase
      const docRef = doc(db, 'incorporationApplications', application.id);
      await deleteDoc(docRef);
      
      // Remove from local state
      setApplications(prev => prev.filter(app => app.applicationId !== applicationId && app.id !== applicationId));
      
      alert('Application deleted successfully');
    } catch (error) {
      console.error('Error deleting application from Firebase:', error);
      alert('Error deleting application');
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/login');
      return;
    }
    
    fetchApplications();
  }, [navigate]);

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.applicationId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.contactPerson || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status display
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600 bg-yellow-100', icon: Clock, text: 'Pending' };
      case 'approved':
        return { color: 'text-green-600 bg-green-100', icon: CheckCircle, text: 'Approved' };
      case 'rejected':
        return { color: 'text-red-600 bg-red-100', icon: XCircle, text: 'Rejected' };
      case 'in-progress':
        return { color: 'text-blue-600 bg-blue-100', icon: RefreshCw, text: 'In Progress' };
      case 'completed':
        return { color: 'text-purple-600 bg-purple-100', icon: CheckCircle, text: 'Completed' };
      default:
        return { color: 'text-gray-600 bg-gray-100', icon: Clock, text: 'Unknown' };
    }
  };

  // Calculate statistics
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    completed: applications.filter(app => app.status === 'completed').length,
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'applications':
        return renderApplicationsContent();
      case 'users':
        return renderUsersContent();
      case 'analytics':
        return renderAnalyticsContent();
      case 'notifications':
        return renderNotificationsContent();
      case 'settings':
        return renderSettingsContent();
      default:
        return renderApplicationsContent();
    }
  };

  const renderApplicationsContent = () => (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ADD ERROR DISPLAY */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center text-red-800">
              <XCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
              <Button 
                onClick={() => {
                  setError(null);
                  fetchApplications();
                }}
                variant="outline" 
                size="sm" 
                className="ml-auto"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search by company name, application ID, contact person, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Incorporation Applications ({filteredApplications.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
              <p>Loading applications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <XCircle className="mx-auto mb-4 text-red-500" size={48} />
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchApplications} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-8">
              <Building className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">
                {applications.length === 0 ? 'No applications found' : 'No matching applications'}
              </p>
              {applications.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Applications will appear here once users submit them.
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Application ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Company Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Contact Person</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Business Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Submitted</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => {
                    const statusDisplay = getStatusDisplay(app.status);
                    const StatusIcon = statusDisplay.icon;
                    
                    return (
                      <tr key={app.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm">{app.applicationId}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{app.companyName}</p>
                            <p className="text-sm text-gray-600">{app.industry}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{app.contactPerson}</p>
                            <p className="text-sm text-gray-600">{app.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{app.businessType}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                            <StatusIcon size={12} className="mr-1" />
                            {statusDisplay.text}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedApplication(app);
                                setShowModal(true);
                              }}
                            >
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                            <select
                              value={app.status}
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                              className="text-xs border rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteApplication(app.id, app.companyName)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <XCircle size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderUsersContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Users className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">User management feature coming soon!</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalyticsContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Analytics & Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <BarChart3 className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Analytics dashboard coming soon!</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderNotificationsContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Bell className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Notification center coming soon!</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderSettingsContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Settings className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Settings panel coming soon!</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </Button>
        </div>

        <nav className="mt-6">
          <div className="px-6 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main Navigation
            </p>
          </div>
          
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
                {item.id === 'applications' && stats.pending > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {stats.pending}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mr-4"
                >
                  <Menu size={20} />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 capitalize">
                    {activeTab === 'dashboard' ? 'Dashboard' : activeTab}
                  </h1>
                  <p className="text-gray-600">
                    {activeTab === 'dashboard' || activeTab === 'applications' 
                      ? 'Manage startup incorporation applications'
                      : `Manage ${activeTab}`
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={fetchApplications}
                  variant="outline"
                  size="sm"
                  disabled={loading}
                >
                  <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-600" />
                  {stats.pending > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {stats.pending}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Application ID</label>
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">{selectedApplication.applicationId}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Company Name</label>
                      <p className="text-sm">{selectedApplication.companyName}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Business Type</label>
                      <p className="text-sm">{selectedApplication.businessType}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Industry</label>
                      <p className="text-sm">{selectedApplication.industry}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Founders</label>
                        <p className="text-sm">{selectedApplication.founders}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Directors</label>
                        <p className="text-sm">{selectedApplication.numberOfDirectors}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-600" />
                      <div>
                        <label className="text-sm font-medium text-gray-600">Contact Person</label>
                        <p className="text-sm">{selectedApplication.contactPerson}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-600" />
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-sm">{selectedApplication.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-600" />
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="text-sm">{selectedApplication.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Address Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Registered Address</label>
                      <p className="text-sm bg-gray-50 p-2 rounded">{selectedApplication.registeredAddress}</p>
                    </div>
                    
                    {selectedApplication.businessAddress && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Business Address</label>
                        <p className="text-sm bg-gray-50 p-2 rounded">{selectedApplication.businessAddress}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Capital Structure */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Capital Structure</h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <IndianRupee size={16} className="text-gray-600" />
                        <div>
                          <label className="text-sm font-medium text-gray-600">Authorized Capital</label>
                          <p className="text-sm">₹{selectedApplication.authorizedCapital?.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IndianRupee size={16} className="text-gray-600" />
                        <div>
                          <label className="text-sm font-medium text-gray-600">Paid-up Capital</label>
                          <p className="text-sm">₹{selectedApplication.paidUpCapital?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    {selectedApplication.estimatedTurnover > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Estimated Annual Turnover</label>
                        <p className="text-sm">₹{selectedApplication.estimatedTurnover?.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Business Description */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Business Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Business Description</label>
                      <p className="text-sm bg-gray-50 p-3 rounded">{selectedApplication.businessDescription}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Director Details</label>
                      <p className="text-sm bg-gray-50 p-3 rounded whitespace-pre-wrap">{selectedApplication.directorDetails}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">GST Required</label>
                      <p className="text-sm capitalize">{selectedApplication.gstRequired}</p>
                    </div>
                    
                    {selectedApplication.bankingPartner && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Banking Partner</label>
                        <p className="text-sm">{selectedApplication.bankingPartner}</p>
                      </div>
                    )}
                    
                    {selectedApplication.preferredCompletionDate && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Preferred Completion</label>
                        <p className="text-sm">{new Date(selectedApplication.preferredCompletionDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedApplication.additionalServices && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Additional Services</label>
                      <p className="text-sm bg-gray-50 p-3 rounded">{selectedApplication.additionalServices}</p>
                    </div>
                  )}
                </div>

                {/* Status and Timestamps */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Application Status</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current Status</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusDisplay(selectedApplication.status).color}`}>
                          {getStatusDisplay(selectedApplication.status).text}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted At</label>
                      <p className="text-sm">{new Date(selectedApplication.submittedAt).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-sm">{new Date(selectedApplication.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-between items-center pt-6 border-t">
                <div className="flex space-x-2">
                  <Button
                    onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={selectedApplication.status === 'approved'}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => updateApplicationStatus(selectedApplication.id, 'in-progress')}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={selectedApplication.status === 'in-progress'}
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Mark In Progress
                  </Button>
                  <Button
                    onClick={() => updateApplicationStatus(selectedApplication.id, 'completed')}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={selectedApplication.status === 'completed'}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark Completed
                  </Button>
                  <Button
                    onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                    variant="destructive"
                    disabled={selectedApplication.status === 'rejected'}
                  >
                    <XCircle size={16} className="mr-2" />
                    Reject
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

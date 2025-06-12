
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Building, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Startups',
      value: '567',
      change: '+8%',
      icon: Building,
      color: 'green'
    },
    {
      title: 'Certifications Issued',
      value: '2,891',
      change: '+23%',
      icon: Award,
      color: 'purple'
    },
    {
      title: 'Growth Rate',
      value: '18.5%',
      change: '+5%',
      icon: TrendingUp,
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs lg:text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(stat.color)}`}>
                    <stat.icon size={20} className="lg:w-6 lg:h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <Card>
          <CardHeader className="pb-3 lg:pb-4">
            <CardTitle className="text-lg lg:text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 lg:space-y-4">
            {[
              { action: 'New user registered', user: 'John Doe', time: '2 hours ago' },
              { action: 'Certification approved', user: 'TechCorp', time: '4 hours ago' },
              { action: 'Startup application submitted', user: 'InnovateLabs', time: '6 hours ago' },
              { action: 'User profile updated', user: 'Jane Smith', time: '8 hours ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{activity.action}</p>
                  <p className="text-xs lg:text-sm text-gray-600 truncate">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 lg:pb-4">
            <CardTitle className="text-lg lg:text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <button className="p-3 lg:p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                <Users className="text-blue-600 mb-2" size={18} />
                <p className="font-medium text-gray-900 text-sm lg:text-base">Add User</p>
                <p className="text-xs lg:text-sm text-gray-600">Create new user account</p>
              </button>
              <button className="p-3 lg:p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                <Award className="text-green-600 mb-2" size={18} />
                <p className="font-medium text-gray-900 text-sm lg:text-base">Issue Certificate</p>
                <p className="text-xs lg:text-sm text-gray-600">Award certification</p>
              </button>
              <button className="p-3 lg:p-4 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors">
                <Building className="text-purple-600 mb-2" size={18} />
                <p className="font-medium text-gray-900 text-sm lg:text-base">Review Applications</p>
                <p className="text-xs lg:text-sm text-gray-600">Pending submissions</p>
              </button>
              <button className="p-3 lg:p-4 bg-red-50 rounded-lg text-left hover:bg-red-100 transition-colors">
                <TrendingUp className="text-red-600 mb-2" size={18} />
                <p className="font-medium text-gray-900 text-sm lg:text-base">View Reports</p>
                <p className="text-xs lg:text-sm text-gray-600">Analytics dashboard</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;

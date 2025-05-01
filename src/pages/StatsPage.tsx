
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';

// Sample data for charts
const data = [
  { name: 'Jan', conversions: 12, compressions: 8, security: 5 },
  { name: 'Feb', conversions: 15, compressions: 10, security: 8 },
  { name: 'Mar', conversions: 18, compressions: 12, security: 10 },
  { name: 'Apr', conversions: 22, compressions: 15, security: 12 },
  { name: 'May', conversions: 25, compressions: 18, security: 15 },
  { name: 'Jun', conversions: 30, compressions: 20, security: 18 },
];

const StatsPage = () => {
  const { userProfile } = useAuth();

  const StatCard = ({ 
    title, 
    value, 
    change, 
    changeType 
  }: { 
    title: string; 
    value: string | number; 
    change: string | number; 
    changeType: 'increase' | 'decrease' 
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-600">{title}</h3>
          <div className="bg-fileforge-blue/10 w-10 h-10 rounded-full flex items-center justify-center">
            <FileText className="h-5 w-5 text-fileforge-blue" />
          </div>
        </div>
        <p className="text-3xl font-bold mb-2">{value}</p>
        <div className={`flex items-center text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {changeType === 'increase' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          <span>{change}% from last month</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AppLayout showSidebar>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Usage & Statistics</h1>
          <p className="text-gray-600">
            Track your file processing usage and statistics over time.
          </p>
          {userProfile?.tier === 'free' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700">
                You are currently on the <strong>Free Plan</strong>. 
                <a href="/pricing" className="underline ml-1">Upgrade to Pro</a> for unlimited usage and advanced features.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Conversions" value={128} change={12} changeType="increase" />
          <StatCard title="File Compressions" value={83} change={8} changeType="increase" />
          <StatCard title="Secured Files" value={68} change={5} changeType="increase" />
          <StatCard title="Storage Used" value="2.4 GB" change={15} changeType="decrease" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Monthly Activity</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="conversions" stroke="#9b87f5" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="compressions" stroke="#6E59A5" />
                    <Line type="monotone" dataKey="security" stroke="#4B3F72" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">File Type Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="conversions" fill="#9b87f5" />
                    <Bar dataKey="compressions" fill="#6E59A5" />
                    <Bar dataKey="security" fill="#4B3F72" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Storage Usage Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="conversions" stackId="1" fill="#9b87f5" stroke="#9b87f5" />
                  <Area type="monotone" dataKey="compressions" stackId="1" fill="#6E59A5" stroke="#6E59A5" />
                  <Area type="monotone" dataKey="security" stackId="1" fill="#4B3F72" stroke="#4B3F72" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default StatsPage;

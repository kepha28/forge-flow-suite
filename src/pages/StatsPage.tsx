
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const StatsPage = () => {
  // Mock data
  const usageStatistics = {
    totalConversions: 47,
    totalSize: "258 MB",
    averageSize: "5.5 MB",
    popularFormat: "PDF to DOCX"
  };

  return (
    <AppLayout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Usage & Stats</h1>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
              <FileText className="h-4 w-4 text-fileforge-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStatistics.totalConversions}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Size Processed</CardTitle>
              <BarChart className="h-4 w-4 text-fileforge-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStatistics.totalSize}</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Most Popular Conversion</CardTitle>
              <PieChart className="h-4 w-4 text-fileforge-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStatistics.popularFormat}</div>
              <p className="text-xs text-muted-foreground">8 conversions this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="activity">
          <TabsList>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="usage">Usage Limits</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent File Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Document-{i}.pdf</p>
                          <span className="text-xs text-gray-500">{i} day{i !== 1 ? 's' : ''} ago</span>
                        </div>
                        <p className="text-sm text-gray-600">Converted to DOCX</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Daily Conversion Limit</span>
                      <span className="text-sm">3 / 3</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full">
                      <div className="h-full bg-fileforge-blue rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Free plan limit. Upgrade for unlimited conversions.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Max File Size</span>
                      <span className="text-sm">100 MB</span>
                    </div>
                    <p className="text-xs text-gray-500">Free plan limit. Upgrade for larger file support.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Storage</span>
                      <span className="text-sm">28 MB / 100 MB</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full">
                      <div className="h-full bg-fileforge-teal rounded-full" style={{ width: '28%' }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Files are stored for 30 days. Upgrade for more storage.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed">
                  <div className="text-center">
                    <LineChart className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Usage trends will appear here as you use FileForge</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default StatsPage;

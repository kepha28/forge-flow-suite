
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CircleCheck, AlertTriangle, TimerReset, Clock, Server, ArrowUp, ArrowDown, HelpCircle, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const StatusPage = () => {
  // Current time for the status page
  const currentTime = new Date().toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // System status data
  const systemStatus = [
    { name: "File Conversion API", status: "operational", uptime: "99.98%", lastIncident: "17 days ago" },
    { name: "File Compression Service", status: "operational", uptime: "99.95%", lastIncident: "8 days ago" },
    { name: "PDF Processing Engine", status: "operational", uptime: "99.99%", lastIncident: "32 days ago" },
    { name: "Image Processing API", status: "degraded", uptime: "97.84%", lastIncident: "2 hours ago" },
    { name: "Video Conversion Service", status: "operational", uptime: "99.91%", lastIncident: "5 days ago" },
    { name: "Storage System", status: "operational", uptime: "99.99%", lastIncident: "45 days ago" },
    { name: "User Authentication", status: "operational", uptime: "99.97%", lastIncident: "12 days ago" },
    { name: "Payment Processing", status: "operational", uptime: "99.99%", lastIncident: "60 days ago" }
  ];
  
  // Incident history data
  const incidents = [
    {
      date: "April 29, 2025",
      title: "Image Processing API Degraded Performance",
      status: "investigating",
      updates: [
        { time: "10:42 AM", message: "We're investigating reports of slow image processing and conversion times." },
        { time: "10:15 AM", message: "Users report delays in image processing. Our team is looking into the issue." }
      ]
    },
    {
      date: "April 21, 2025",
      title: "File Compression Service Outage",
      status: "resolved",
      updates: [
        { time: "3:45 PM", message: "The issue has been fully resolved and the system is operating normally." },
        { time: "2:30 PM", message: "We've identified the root cause and are implementing a fix." },
        { time: "1:15 PM", message: "We're investigating an issue affecting file compression operations." }
      ]
    },
    {
      date: "April 14, 2025",
      title: "Scheduled Maintenance",
      status: "completed",
      updates: [
        { time: "4:00 AM", message: "Maintenance completed successfully. All systems operational." },
        { time: "2:00 AM", message: "Scheduled maintenance has begun. Some services may be temporarily unavailable." }
      ]
    }
  ];
  
  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "outage":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Helper function to get incident status icon
  const getIncidentStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      case "investigating":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "identified":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "monitoring":
        return <TimerReset className="h-5 w-5 text-blue-500" />;
      case "completed":
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-fileforge-gray flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText size={36} className="text-fileforge-blue" />
            </div>
            <h1 className="text-3xl font-bold mb-4">System Status</h1>
            <p className="text-gray-600 mb-2">
              Current status of FileForge Suite services.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {currentTime}
            </p>
          </div>
          
          {/* Overall Status */}
          <div className="mb-10">
            <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  {systemStatus.some(s => s.status !== "operational") ? (
                    <>
                      <AlertTriangle className="h-8 w-8 text-yellow-500 mr-4" />
                      <div>
                        <h2 className="text-xl font-semibold">Partial System Outage</h2>
                        <p className="text-gray-600">Some services are experiencing issues</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CircleCheck className="h-8 w-8 text-green-500 mr-4" />
                      <div>
                        <h2 className="text-xl font-semibold">All Systems Operational</h2>
                        <p className="text-gray-600">All FileForge services are running smoothly</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {systemStatus.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(service.status)}
                        <span className="ml-3 text-gray-900">{service.name}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-sm text-gray-500">
                          <span className="mr-1">Uptime:</span>
                          <span className="font-medium">{service.uptime}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="mr-1">Last incident:</span>
                          <span className="font-medium">{service.lastIncident}</span>
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            service.status === "operational" ? "bg-green-100 text-green-800" :
                            service.status === "degraded" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {service.status === "operational" ? "Operational" :
                             service.status === "degraded" ? "Degraded" :
                             "Outage"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Uptime Metrics */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-blue w-1 h-6 inline-block mr-3"></span>
              30-Day Uptime
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Overall Uptime", value: "99.95%", icon: ArrowUp },
                { label: "Average Response Time", value: "187ms", icon: Clock },
                { label: "Service Interruptions", value: "3", icon: ArrowDown }
              ].map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={index} className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${index === 0 ? "bg-green-100" : index === 1 ? "bg-blue-100" : "bg-yellow-100"}`}>
                        <IconComponent className={`h-6 w-6 ${index === 0 ? "text-green-600" : index === 1 ? "text-blue-600" : "text-yellow-600"}`} />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Incident History */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-fileforge-teal w-1 h-6 inline-block mr-3"></span>
              Incident History
            </h2>
            
            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <Card key={index} className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        {getIncidentStatusIcon(incident.status)}
                        <h3 className="ml-3 font-semibold">{incident.title}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          incident.status === "resolved" || incident.status === "completed" ? "bg-green-100 text-green-800" :
                          incident.status === "investigating" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{incident.date}</p>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Updates:</h4>
                    <div className="space-y-4">
                      {incident.updates.map((update, i) => (
                        <div key={i} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-fileforge-blue"></div>
                            {i !== incident.updates.length - 1 && (
                              <div className="flex-grow w-px bg-gray-300 my-1"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{update.time}</p>
                            <p className="text-gray-600">{update.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Subscribe to Updates */}
          <div className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal rounded-lg p-8 text-white">
            <div className="md:flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Subscribe to Status Updates</h2>
                <p className="text-blue-100 mb-4 md:mb-0">Get notified about service disruptions and maintenance.</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-l-md focus:outline-none text-gray-900 sm:rounded-none"
                />
                <button className="bg-white text-fileforge-blue font-medium px-4 py-2 rounded-r-md hover:bg-blue-50 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;

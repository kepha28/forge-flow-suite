
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, userProfile } = useAuth();

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-fileforge-blue text-white">
                    {getInitials(userProfile?.fullName)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{userProfile?.fullName || user?.email}</h2>
                <p className="text-gray-500 mb-4">{user?.email}</p>
                <Button variant="outline" className="w-full mb-2">
                  Change Profile Picture
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p>{userProfile?.fullName || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subscription</p>
                  <p className="capitalize">{userProfile?.tier || 'Free'} Plan</p>
                </div>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/settings">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Current Plan</p>
                  <p className="capitalize font-medium">{userProfile?.tier || 'Free'}</p>
                </div>
                {userProfile?.tier === 'free' ? (
                  <Button asChild className="bg-gradient-to-r from-fileforge-blue to-fileforge-teal w-full">
                    <Link to="/pricing">Upgrade Now</Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">Manage Subscription</Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;

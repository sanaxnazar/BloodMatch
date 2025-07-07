
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, MapPin, Bell, Calendar, Shield, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAvailable, setIsAvailable] = useState(true);

  // Mock data for demonstration
  const mockMatches = [
    {
      id: 1,
      name: "Sarah Johnson",
      bloodGroup: "O+",
      location: "Downtown Hospital, 2.1 miles away",
      urgency: "Critical",
      timePosted: "15 minutes ago",
      compatibility: 100
    },
    {
      id: 2,
      name: "Michael Chen",
      bloodGroup: "A+",
      location: "Central Medical Center, 3.5 miles away",
      urgency: "Normal",
      timePosted: "1 hour ago",
      compatibility: 85
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      bloodGroup: "B+",
      location: "City General Hospital, 5.2 miles away",
      urgency: "Normal",
      timePosted: "2 hours ago",
      compatibility: 75
    }
  ];

  const mockDonors = [
    {
      id: 1,
      name: "David Kim",
      bloodGroup: "O-",
      location: "3.2 miles away",
      lastDonation: "3 months ago",
      status: "Available",
      rating: 4.9
    },
    {
      id: 2,
      name: "Lisa Thompson",
      bloodGroup: "A+",
      location: "1.8 miles away",
      lastDonation: "2 months ago",
      status: "Available",
      rating: 4.8
    }
  ];

  const handleContactDonor = (donorName: string) => {
    toast({
      title: "Contact Request Sent",
      description: `Your request has been sent to ${donorName}. They will receive a notification immediately.`,
    });
  };

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    toast({
      title: isAvailable ? "Status Updated" : "You're Back Online!",
      description: isAvailable 
        ? "You're now temporarily unavailable for donations." 
        : "You're now available for donation requests.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-red-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                BloodMatch
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isAvailable ? "default" : "secondary"} className="px-3 py-1">
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50"
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, John!</h1>
          <p className="text-gray-600">Your blood type: <span className="font-semibold text-red-600">O+</span> • Location: <span className="font-semibold">San Francisco, CA</span></p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Total Donations</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Heart className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Lives Saved</p>
                  <p className="text-2xl font-bold">36</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Next Eligible</p>
                  <p className="text-2xl font-bold">45d</p>
                </div>
                <Calendar className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Compatibility</p>
                  <p className="text-2xl font-bold">98%</p>
                </div>
                <Shield className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Matches */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="matches" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="matches">Smart Matches</TabsTrigger>
                <TabsTrigger value="requests">My Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="matches" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Compatible Matches Near You</h2>
                  <Badge variant="outline" className="border-red-200 text-red-700">
                    {mockMatches.length} matches found
                  </Badge>
                </div>
                
                {mockMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow duration-300 border border-red-100">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{match.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{match.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={match.urgency === 'Critical' ? 'destructive' : 'secondary'}
                            className="mb-2"
                          >
                            {match.urgency}
                          </Badge>
                          <p className="text-sm text-gray-500">{match.timePosted}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Blood Type</p>
                            <p className="font-bold text-red-600">{match.bloodGroup}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Match</p>
                            <p className="font-bold text-green-600">{match.compatibility}%</p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleContactDonor(match.name)}
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="requests" className="space-y-4">
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Requests</h3>
                  <p className="text-gray-600 mb-4">You haven't posted any blood requests yet.</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Create New Request
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Quick Actions & Availability */}
          <div className="space-y-6">
            {/* Availability Toggle */}
            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span>Donation Status</span>
                </CardTitle>
                <CardDescription>
                  Control your availability for donation requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">
                    {isAvailable ? "Available for Donations" : "Temporarily Unavailable"}
                  </span>
                  <Badge variant={isAvailable ? "default" : "secondary"}>
                    {isAvailable ? "ONLINE" : "OFFLINE"}
                  </Badge>
                </div>
                <Button 
                  onClick={handleToggleAvailability}
                  variant={isAvailable ? "outline" : "default"}
                  className="w-full"
                >
                  {isAvailable ? "Mark Unavailable" : "Mark Available"}
                </Button>
              </CardContent>
            </Card>

            {/* Nearby Donors */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Nearby Donors</span>
                </CardTitle>
                <CardDescription>
                  Active donors in your area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockDonors.map((donor) => (
                  <div key={donor.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{donor.name}</p>
                      <p className="text-sm text-gray-600">{donor.bloodGroup} • {donor.location}</p>
                    </div>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      {donor.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                  View All Donors
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Alert */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Bell className="w-6 h-6 text-orange-600" />
                  <h3 className="font-semibold text-orange-900">Emergency Alert</h3>
                </div>
                <p className="text-sm text-orange-800 mb-4">
                  Critical blood shortage for O- type in your area. Your help could save lives!
                </p>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Respond Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

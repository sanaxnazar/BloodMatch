
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, MapPin, Bell, Calendar, Shield, Phone, Trophy, Star, Activity, Moon, Sun, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { EmergencySOSButton } from "@/components/EmergencySOSButton";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme, toggleDarkMode, isDarkMode } = useTheme();
  const [isAvailable, setIsAvailable] = useState(true);

  // Enhanced mock data
  const mockMatches = [
    {
      id: 1,
      name: "Sarah Johnson",
      bloodGroup: "O+",
      location: "Downtown Hospital, 2.1 miles away",
      urgency: "Critical",
      timePosted: "15 minutes ago",
      compatibility: 100,
      urgencyLevel: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      bloodGroup: "A+",
      location: "Central Medical Center, 3.5 miles away",
      urgency: "Normal",
      timePosted: "1 hour ago",
      compatibility: 85,
      urgencyLevel: 2
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      bloodGroup: "B+",
      location: "City General Hospital, 5.2 miles away",
      urgency: "Normal",
      timePosted: "2 hours ago",
      compatibility: 75,
      urgencyLevel: 1
    }
  ];

  const donationHistory = [
    { date: '2024-01-15', location: 'SF General Hospital', amount: '450ml', type: 'Whole Blood' },
    { date: '2023-10-20', location: 'Red Cross Center', amount: '250ml', type: 'Platelets' },
    { date: '2023-07-10', location: 'Community Blood Drive', amount: '450ml', type: 'Whole Blood' },
  ];

  const achievements = [
    { name: 'Life Saver', description: '10+ donations', icon: Heart, earned: true },
    { name: 'Hero', description: '5+ emergency responses', icon: Shield, earned: true },
    { name: 'Community Champion', description: 'Top donor in area', icon: Trophy, earned: false },
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

  const nextEligibleDate = new Date();
  nextEligibleDate.setDate(nextEligibleDate.getDate() + 45);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
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
              {/* Theme Controls */}
              <div className="flex items-center space-x-2 border border-border rounded-lg p-1">
                <Button
                  variant={theme === 'light' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="h-7 px-2"
                >
                  <Sun className="w-3 h-3" />
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="h-7 px-2"
                >
                  <Moon className="w-3 h-3" />
                </Button>
                <Button
                  variant={theme === 'healthcare' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('healthcare')}
                  className="h-7 px-2"
                >
                  <Shield className="w-3 h-3" />
                </Button>
              </div>
              <Badge variant={isAvailable ? "default" : "secondary"} className="px-3 py-1">
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
                className="text-foreground/70 hover:text-foreground hover:bg-accent"
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-foreground/70 hover:text-foreground hover:bg-accent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back, John!</h1>
          <p className="text-muted-foreground">Your blood type: <span className="font-semibold text-red-600">O+</span> • Location: <span className="font-semibold">San Francisco, CA</span></p>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Next eligible:</span>
              <span className="text-sm font-medium text-green-600">{nextEligibleDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Level 3 Donor</span>
            </div>
          </div>
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
                  <p className="text-purple-100">Donor Score</p>
                  <p className="text-2xl font-bold">4.9★</p>
                </div>
                <Shield className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Matches & History */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="matches" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="matches">Smart Matches</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
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
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Urgency Level</span>
                          <span>{match.urgencyLevel}/5</span>
                        </div>
                        <Progress value={match.urgencyLevel * 20} className="h-2" />
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
              
              <TabsContent value="history" className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Donation History</h2>
                {donationHistory.map((donation, index) => (
                  <Card key={index} className="border border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{donation.type}</p>
                          <p className="text-sm text-gray-600">{donation.location}</p>
                          <p className="text-xs text-gray-500">{donation.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{donation.amount}</p>
                          <Badge variant="outline" className="border-green-200 text-green-700">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className={`border ${achievement.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <achievement.icon className={`w-8 h-8 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                          <div>
                            <p className="font-medium text-gray-900">{achievement.name}</p>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                          {achievement.earned && (
                            <Trophy className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Availability & Quick Actions */}
          <div className="space-y-6">
            {/* Enhanced Availability Toggle */}
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
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">
                    {isAvailable ? "Available for Donations" : "Temporarily Unavailable"}
                  </span>
                  <Badge variant={isAvailable ? "default" : "secondary"}>
                    {isAvailable ? "ONLINE" : "OFFLINE"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quick Toggle</span>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={handleToggleAvailability}
                  />
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Activity className="w-4 h-4" />
                    <span>Health Status: Eligible</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Health score: 85/100</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View Nearby Centers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Schedule Donation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Find Donors
                </Button>
              </CardContent>
            </Card>

            {/* Emergency SOS Mode */}
            <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-destructive">
                  <Bell className="w-5 h-5" />
                  <span>Emergency Response</span>
                </CardTitle>
                <CardDescription>
                  Instant emergency blood request broadcasting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmergencySOSButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

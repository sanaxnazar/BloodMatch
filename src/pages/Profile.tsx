import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Heart, MapPin, Calendar, Shield, User, Bell, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bloodGroup: 'O+',
    location: 'San Francisco, CA',
    age: '28',
    weight: '75',
    lastDonation: '2024-01-15',
    emergencyContact: '+1 (555) 987-6543',
    medicalConditions: 'None',
    notifications: true,
    darkMode: false
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const donationHistory = [
    { date: '2024-01-15', location: 'SF General Hospital', type: 'Whole Blood', status: 'Completed' },
    { date: '2023-10-20', location: 'Red Cross Center', type: 'Platelets', status: 'Completed' },
    { date: '2023-07-10', location: 'Community Blood Drive', type: 'Whole Blood', status: 'Completed' },
  ];

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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50"
              >
                Dashboard
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your personal information and donation preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-red-600" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Update your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={profileData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={profileData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      value={profileData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Medical Information</span>
                </CardTitle>
                <CardDescription>
                  Keep your health information up to date
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lastDonation">Last Donation Date</Label>
                  <Input
                    id="lastDonation"
                    type="date"
                    value={profileData.lastDonation}
                    onChange={(e) => handleInputChange('lastDonation', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Input
                    id="medicalConditions"
                    value={profileData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    placeholder="Any relevant medical conditions"
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Save Changes
            </Button>
          </div>

          {/* Right Column - Stats & History */}
          <div className="space-y-6">
            {/* Donation Stats */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span>Donation Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">12</p>
                  <p className="text-sm text-green-700">Total Donations</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">36</p>
                  <p className="text-sm text-blue-700">Lives Saved</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">4.9★</p>
                  <p className="text-sm text-purple-700">Donor Rating</p>
                </div>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span>Recent Donations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {donationHistory.map((donation, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-gray-900">{donation.type}</p>
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        {donation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{donation.location}</p>
                    <p className="text-xs text-gray-500">{donation.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <span>Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <Switch
                    checked={profileData.notifications}
                    onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Dark Mode</span>
                  </div>
                  <Switch
                    checked={profileData.darkMode}
                    onCheckedChange={(checked) => handleInputChange('darkMode', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

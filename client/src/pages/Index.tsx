
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MapPin, Bell, Shield, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Smart Matching",
      description: "AI-powered algorithm matches donors with seekers based on blood type, location, and urgency"
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Find the nearest compatible donors or seekers in your area with real-time mapping"
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Get notified immediately when someone needs your blood type or when donors are available"
    },
    {
      icon: Shield,
      title: "Verified & Safe",
      description: "All users are verified with medical safety checks and eligibility requirements"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-red-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">HemoGlobe</span>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Save Lives with
              <span className="block bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">HemoGlobe</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect blood donors and seekers instantly through our AI-powered matching system. 
              Every second counts when lives are at stake.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => navigate('/register?type=donor')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="mr-2 h-5 w-5" />
                Become a Donor
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/register?type=seeker')}
                className="border-red-200 text-red-700 hover:bg-red-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Find Donors
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-red-600 mb-2">5,000+</div>
              <div className="text-gray-600">Registered Donors</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-red-600 mb-2">1,200+</div>
              <div className="text-gray-600">Lives Saved</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose HemoGlobe?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform uses cutting-edge technology to make blood donation more efficient and accessible
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of heroes who are making a difference in their communities through blood donation.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-white text-red-700 hover:bg-red-50 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >Join HemoGlobe Today</Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

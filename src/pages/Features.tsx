
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Trophy, 
  Shield, 
  Activity,
  Users,
  Award,
  Clock,
  Navigation,
  Moon,
  Sun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EligibilityQuiz from '@/components/EligibilityQuiz';
import MapView from '@/components/MapView';

const Features = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const features = [
    {
      id: 'availability',
      title: 'Donor Availability Toggle',
      description: 'Control your donation availability status',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-red-500',
      demo: 'toggle'
    },
    {
      id: 'map',
      title: 'Live Map View',
      description: 'Find nearby donors and donation centers',
      icon: <MapPin className="w-6 h-6" />,
      color: 'bg-blue-500',
      demo: 'map'
    },
    {
      id: 'history',
      title: 'Donation History',
      description: 'Track your donation journey and eligibility',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-green-500',
      demo: 'history'
    },
    {
      id: 'rewards',
      title: 'Community Rewards',
      description: 'Earn badges and achievements for donations',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-yellow-500',
      demo: 'rewards'
    },
    {
      id: 'quiz',
      title: 'Medical Eligibility Quiz',
      description: 'Quick health screening for donation safety',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-purple-500',
      demo: 'quiz'
    },
    {
      id: 'heatmap',
      title: 'Urgency Heatmap',
      description: 'Visual display of high-demand areas',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-orange-500',
      demo: 'heatmap'
    }
  ];

  const renderFeatureDemo = (featureId: string) => {
    switch (featureId) {
      case 'availability':
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Donation Status</span>
              <Switch defaultChecked />
            </div>
            <div className="text-center">
              <Badge className="bg-green-500 text-white">Available for Donation</Badge>
            </div>
          </div>
        );
      
      case 'map':
        return <MapView />;
      
      case 'history':
        return (
          <div className="p-4 space-y-3">
            {[
              { date: '2024-01-15', type: 'Whole Blood', status: 'Completed' },
              { date: '2023-10-20', type: 'Platelets', status: 'Completed' },
              { date: '2023-07-10', type: 'Plasma', status: 'Completed' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                <div>
                  <p className="font-medium">{item.type}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        );
      
      case 'rewards':
        return (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Gold Donor</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Community Hero</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">Level 15</p>
              <p className="text-sm text-muted-foreground">Master Donor</p>
            </div>
          </div>
        );
      
      case 'quiz':
        return <EligibilityQuiz onComplete={() => {}} />;
      
      case 'heatmap':
        return (
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-12 rounded ${
                    i % 3 === 0 ? 'bg-red-200 dark:bg-red-800' : 
                    i % 3 === 1 ? 'bg-yellow-200 dark:bg-yellow-800' : 
                    'bg-green-200 dark:bg-green-800'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                Low Demand
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                Medium Demand
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                High Demand
              </span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-red-100 dark:border-gray-700 sticky top-0 z-50">
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
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                />
                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the powerful features that make BloodMatch the ultimate platform for blood donation coordination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <Card 
              key={feature.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-red-200 dark:hover:border-red-800 dark:bg-gray-800 dark:border-gray-700"
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`${feature.color} p-2 rounded-lg text-white`}>
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg dark:text-white">{feature.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              {activeFeature === feature.id && (
                <CardContent>
                  <div className="border-t pt-4">
                    {renderFeatureDemo(feature.id)}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Choose BloodMatch?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Matching</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Instant connections between donors and recipients</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Medical Safety</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive health screening and safety protocols</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Navigation className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Location-based</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Find the nearest donation centers and donors</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Driven</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Gamified experience with rewards and recognition</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;

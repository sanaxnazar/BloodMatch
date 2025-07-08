import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  MapPin, 
  Bell, 
  Shield, 
  AlertTriangle, 
  Zap, 
  Phone, 
  Clock,
  Star,
  Users,
  Activity,
  Moon,
  Sun,
  Palette
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Mockups = () => {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState('light');
  const [sosActive, setSosActive] = useState(false);

  const themes = {
    light: {
      bg: 'bg-gradient-to-br from-red-50 via-white to-red-50',
      cardBg: 'bg-white/80',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      accent: 'text-red-600'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      cardBg: 'bg-gray-800/80',
      text: 'text-white',
      subtext: 'text-gray-300',
      accent: 'text-red-400'
    },
    emergency: {
      bg: 'bg-gradient-to-br from-red-600 via-red-700 to-red-800',
      cardBg: 'bg-red-800/80',
      text: 'text-white',
      subtext: 'text-red-100',
      accent: 'text-yellow-300'
    },
    healthcare: {
      bg: 'bg-gradient-to-br from-blue-50 via-white to-green-50',
      cardBg: 'bg-white/80',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      accent: 'text-blue-600'
    }
  };

  const currentTheme = themes[activeTheme as keyof typeof themes];

  const handleSOS = () => {
    setSosActive(true);
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme.bg}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-red-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                BloodMatch Mockups
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${currentTheme.text}`}>
            BloodMatch Enhancement Mockups
          </h1>
          <p className={`text-lg ${currentTheme.subtext}`}>
            Visual prototypes for upcoming features
          </p>
        </div>

        <Tabs defaultValue="emergency" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="emergency">Emergency SOS</TabsTrigger>
            <TabsTrigger value="themes">Adaptive Themes</TabsTrigger>
            <TabsTrigger value="enhanced">Enhanced UI</TabsTrigger>
          </TabsList>

          {/* Emergency SOS Mode */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className={`${currentTheme.cardBg} backdrop-blur-sm border-red-200`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${currentTheme.text}`}>
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <span>Emergency SOS Mode</span>
                </CardTitle>
                <CardDescription className={currentTheme.subtext}>
                  One-tap emergency broadcasting for critical blood needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* SOS Button */}
                <div className="flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-red-100 to-red-50 rounded-xl">
                  <div className="relative">
                    <Button
                      size="lg"
                      onClick={handleSOS}
                      className={`w-32 h-32 rounded-full text-2xl font-bold shadow-2xl transition-all duration-300 ${
                        sosActive 
                          ? 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse scale-110' 
                          : 'bg-gradient-to-r from-red-500 to-red-600 hover:scale-105'
                      }`}
                    >
                      {sosActive ? (
                        <div className="flex flex-col items-center">
                          <Zap className="w-8 h-8 mb-1" />
                          <span className="text-sm">SENDING</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <AlertTriangle className="w-8 h-8 mb-1" />
                          <span className="text-sm">SOS</span>
                        </div>
                      )}
                    </Button>
                    {sosActive && (
                      <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                    )}
                  </div>
                  <p className="text-center text-gray-700 max-w-md">
                    Emergency broadcast will notify all compatible donors within 10km radius
                  </p>
                </div>

                {/* Emergency Status Panel */}
                {sosActive && (
                  <div className="animate-fade-in bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-red-800">Emergency Alert Active</span>
                    </div>
                    <div className="space-y-2 text-sm text-red-700">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>247 compatible donors notified</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Response time: 2-5 minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Radius: 10km from your location</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white/50 hover:bg-white/70 transition-colors">
                    <CardContent className="p-4 text-center">
                      <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <p className="font-medium">Call Hospital</p>
                      <p className="text-sm text-gray-600">Direct hotline</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/50 hover:bg-white/70 transition-colors">
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <p className="font-medium">Nearest Hospital</p>
                      <p className="text-sm text-gray-600">2.3km away</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/50 hover:bg-white/70 transition-colors">
                    <CardContent className="p-4 text-center">
                      <Bell className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <p className="font-medium">Alert Contacts</p>
                      <p className="text-sm text-gray-600">Emergency list</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Adaptive Themes */}
          <TabsContent value="themes" className="space-y-6">
            <Card className={`${currentTheme.cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${currentTheme.text}`}>
                  <Palette className="w-6 h-6 text-blue-500" />
                  <span>Adaptive Color Themes</span>
                </CardTitle>
                <CardDescription className={currentTheme.subtext}>
                  Multiple theme options for different use cases and accessibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selector */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {Object.entries(themes).map(([key, theme]) => (
                    <Button
                      key={key}
                      variant={activeTheme === key ? "default" : "outline"}
                      onClick={() => setActiveTheme(key)}
                      className="capitalize"
                    >
                      {key === 'light' && <Sun className="w-4 h-4 mr-2" />}
                      {key === 'dark' && <Moon className="w-4 h-4 mr-2" />}
                      {key === 'emergency' && <AlertTriangle className="w-4 h-4 mr-2" />}
                      {key === 'healthcare' && <Shield className="w-4 h-4 mr-2" />}
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Button>
                  ))}
                </div>

                {/* Theme Preview */}
                <div className={`p-6 rounded-xl transition-all duration-500 ${currentTheme.bg}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className={`${currentTheme.cardBg} backdrop-blur-sm`}>
                      <CardHeader>
                        <CardTitle className={`flex items-center space-x-2 ${currentTheme.text}`}>
                          <Heart className={`w-5 h-5 ${currentTheme.accent}`} />
                          <span>Donation Request</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className={currentTheme.text}>Blood Type:</span>
                            <Badge variant="outline" className={`${currentTheme.accent} border-current`}>
                              O+ Positive
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={currentTheme.text}>Urgency:</span>
                            <Badge variant="destructive">Critical</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={currentTheme.text}>Distance:</span>
                            <span className={currentTheme.subtext}>2.5km away</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`${currentTheme.cardBg} backdrop-blur-sm`}>
                      <CardHeader>
                        <CardTitle className={`flex items-center space-x-2 ${currentTheme.text}`}>
                          <Activity className={`w-5 h-5 ${currentTheme.accent}`} />
                          <span>Your Stats</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className={currentTheme.text}>Donations:</span>
                            <span className={`font-bold ${currentTheme.accent}`}>12</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={currentTheme.text}>Lives Saved:</span>
                            <span className={`font-bold ${currentTheme.accent}`}>36</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={currentTheme.text}>Rating:</span>
                            <div className="flex items-center space-x-1">
                              {[1,2,3,4,5].map((star) => (
                                <Star key={star} className={`w-4 h-4 fill-current ${currentTheme.accent}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Theme Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-medium">Light Mode</h4>
                    <p className="text-sm text-gray-600">Default daylight theme</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Moon className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                    <h4 className="font-medium text-white">Dark Mode</h4>
                    <p className="text-sm text-gray-300">Reduced eye strain</p>
                  </div>
                  <div className="text-center p-4 bg-red-600/50 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                    <h4 className="font-medium text-white">Emergency</h4>
                    <p className="text-sm text-red-100">High contrast alerts</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50/50 rounded-lg">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium">Healthcare</h4>
                    <p className="text-sm text-gray-600">Medical professional</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced UI */}
          <TabsContent value="enhanced" className="space-y-6">
            <Card className={`${currentTheme.cardBg} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${currentTheme.text}`}>
                  <Zap className="w-6 h-6 text-purple-500" />
                  <span>Enhanced UI Elements</span>
                </CardTitle>
                <CardDescription className={currentTheme.subtext}>
                  Improved animations, micro-interactions, and visual feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Animated Cards */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>
                    Animated Donation Cards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-800">Urgent Request</h5>
                            <p className="text-red-600">O+ Blood needed</p>
                            <p className="text-sm text-red-500">3 minutes ago</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-800">Donation Complete</h5>
                            <p className="text-green-600">Thank you for saving lives!</p>
                            <p className="text-sm text-green-500">2 hours ago</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Interactive Progress */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>
                    Interactive Progress Indicators
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Monthly Goal Progress</span>
                        <span className="text-sm text-gray-600">8/10 donations</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: '80%' }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Trust Score</span>
                        <span className="text-sm text-gray-600">4.9/5.0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-5 h-5 transition-all duration-200 ${
                              star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Action Button */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>
                    Floating Action Elements
                  </h4>
                  <div className="relative bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">App content area</p>
                    <Button
                      size="lg"
                      className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                    >
                      <Heart className="w-6 h-6" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Floating action button for quick donation requests
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Mockups;
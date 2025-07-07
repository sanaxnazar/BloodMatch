
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MapPin, Shield, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EligibilityQuiz from '../components/EligibilityQuiz';
import MapView from '../components/MapView';

const Features = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<{ eligible: boolean; score: number } | null>(null);

  const handleQuizComplete = (eligible: boolean, score: number) => {
    setQuizResult({ eligible, score });
    setShowQuiz(false);
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
                onClick={() => navigate('/profile')}
                className="text-red-700 hover:text-red-800 hover:bg-red-50"
              >
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Features</h1>
          <p className="text-gray-600">Explore medical eligibility, interactive maps, and community achievements</p>
        </div>

        <Tabs defaultValue="quiz" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quiz">Medical Quiz</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span>Medical Eligibility Assessment</span>
                </CardTitle>
                <CardDescription>
                  Take our comprehensive quiz to determine your donation eligibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showQuiz && !quizResult && (
                  <div className="text-center py-8">
                    <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Check Your Eligibility?</h3>
                    <p className="text-gray-600 mb-6">
                      Our quick 5-question assessment will help determine if you're eligible to donate blood safely.
                    </p>
                    <Button 
                      onClick={() => setShowQuiz(true)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      Start Assessment
                    </Button>
                  </div>
                )}
                
                {showQuiz && (
                  <EligibilityQuiz onComplete={handleQuizComplete} />
                )}
                
                {quizResult && (
                  <div className="text-center py-8">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      quizResult.eligible ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Shield className={`w-8 h-8 ${quizResult.eligible ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Assessment Complete
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Eligibility Score: {quizResult.score}/100
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button 
                        onClick={() => { setQuizResult(null); setShowQuiz(true); }}
                        variant="outline"
                      >
                        Retake Quiz
                      </Button>
                      {quizResult.eligible && (
                        <Button 
                          onClick={() => navigate('/dashboard')}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        >
                          Find Matches
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map" className="space-y-6">
            <MapView />
          </TabsContent>
          
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <span>Leaderboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Alex Johnson', donations: 24, level: 'Hero' },
                    { name: 'Sarah Davis', donations: 18, level: 'Champion' },
                    { name: 'John Doe (You)', donations: 12, level: 'Guardian' },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-600">{user.donations}</p>
                        <p className="text-xs text-gray-500">donations</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-6 h-6 text-purple-600" />
                    <span>Impact Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">1,247</p>
                    <p className="text-sm text-purple-700">Lives Saved This Month</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-3xl font-bold text-red-600">98%</p>
                    <p className="text-sm text-red-700">Match Success Rate</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">3.2min</p>
                    <p className="text-sm text-green-700">Average Response Time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Features;

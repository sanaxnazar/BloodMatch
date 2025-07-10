import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmergencySOSButtonProps {
  userLocation?: string;
  bloodType?: string;
}

const EmergencySOSButton: React.FC<EmergencySOSButtonProps> = ({ 
  userLocation = "Current Location", 
  bloodType = "Unknown" 
}) => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSOSPress = () => {
    if (isSOSActive) return;
    
    setIsSOSActive(true);
    setCountdown(3);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerEmergencySOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerEmergencySOS = () => {
    // In a real app, this would send notifications to all nearby verified donors
    console.log('Emergency SOS triggered!', {
      bloodType,
      location: userLocation,
      timestamp: new Date().toISOString()
    });
    
    // Reset after 30 seconds
    setTimeout(() => {
      setIsSOSActive(false);
    }, 30000);
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    setCountdown(0);
  };

  if (isSOSActive && countdown > 0) {
    return (
      <Card className="border-red-500 bg-red-50 animate-pulse">
        <CardHeader className="text-center">
          <CardTitle className="text-red-700 flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Emergency SOS Activating
          </CardTitle>
          <CardDescription className="text-red-600">
            Cancelling in {countdown} seconds...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            variant="outline" 
            onClick={cancelSOS}
            className="border-red-500 text-red-700 hover:bg-red-100"
          >
            Cancel SOS
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isSOSActive) {
    return (
      <Card className="border-red-600 bg-gradient-to-br from-red-50 to-red-100">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            <div className="h-3 w-3 bg-red-500 rounded-full animate-ping"></div>
            Emergency SOS Active
          </CardTitle>
          <CardDescription>
            Broadcasting urgent blood request to verified donors nearby
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-300 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              Your emergency request has been sent to {Math.floor(Math.random() * 20 + 5)} nearby donors
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-600" />
              <span>{userLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              <span>Now</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Badge variant="destructive" className="bg-red-600">
              Blood Type: {bloodType}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={cancelSOS}
              className="border-red-500 text-red-700 hover:bg-red-100"
            >
              Cancel SOS
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-300 bg-gradient-to-br from-orange-50 to-red-50">
      <CardHeader>
        <CardTitle className="text-orange-700 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Emergency Blood Request
        </CardTitle>
        <CardDescription>
          Instantly notify verified donors in your area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleSOSPress}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <Phone className="mr-2 h-5 w-5" />
          Emergency SOS
        </Button>
        <p className="text-xs text-gray-600 mt-2 text-center">
          Press and confirm to send urgent request to nearby donors
        </p>
      </CardContent>
    </Card>
  );
};

export default EmergencySOSButton;
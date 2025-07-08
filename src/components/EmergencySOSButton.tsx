import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Zap, Users, Clock, MapPin, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface EmergencySOSButtonProps {
  className?: string;
}

export const EmergencySOSButton: React.FC<EmergencySOSButtonProps> = ({ className = "" }) => {
  const [sosActive, setSosActive] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const { toast } = useToast();

  const handleSOS = () => {
    if (sosActive) return;
    
    setSosActive(true);
    setResponseCount(0);
    
    // Simulate SOS activation
    toast({
      title: "🚨 Emergency SOS Activated",
      description: "Broadcasting to all compatible donors within 10km...",
      duration: 5000,
    });

    // Simulate responses coming in
    const responseInterval = setInterval(() => {
      setResponseCount(prev => {
        const newCount = prev + Math.floor(Math.random() * 5) + 1;
        if (newCount >= 247) {
          clearInterval(responseInterval);
          return 247;
        }
        return newCount;
      });
    }, 500);

    // Auto-deactivate after 10 seconds
    setTimeout(() => {
      setSosActive(false);
      clearInterval(responseInterval);
      toast({
        title: "✅ SOS Response Complete",
        description: `${responseCount} donors have been notified. Help is on the way!`,
      });
    }, 10000);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* SOS Button */}
      <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border border-red-200 dark:border-red-800">
        <div className="relative">
          <Button
            size="lg"
            onClick={handleSOS}
            disabled={sosActive}
            className={`w-24 h-24 rounded-full text-lg font-bold shadow-2xl transition-all duration-300 ${
              sosActive 
                ? 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse scale-110' 
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 active:scale-95'
            }`}
          >
            {sosActive ? (
              <div className="flex flex-col items-center">
                <Zap className="w-6 h-6 mb-1" />
                <span className="text-xs">ACTIVE</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <AlertTriangle className="w-6 h-6 mb-1" />
                <span className="text-xs">SOS</span>
              </div>
            )}
          </Button>
          
          {sosActive && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-pulse"></div>
            </>
          )}
        </div>
        
        <div className="text-center">
          <p className="font-semibold text-red-800 dark:text-red-200">Emergency Blood Request</p>
          <p className="text-sm text-red-600 dark:text-red-300 max-w-xs">
            {sosActive ? 'Broadcasting emergency alert...' : 'Tap to send emergency alert to nearby donors'}
          </p>
        </div>
      </div>

      {/* Emergency Status Panel */}
      {sosActive && (
        <Card className="animate-fade-in bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-red-800 dark:text-red-200">Emergency Alert Active</span>
            </div>
            <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{responseCount} compatible donors notified</span>
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
          </CardContent>
        </Card>
      )}

      {/* Quick Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button
          variant="outline"
          size="sm"
          className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call Hospital
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Nearest Center
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Alert Contacts
        </Button>
      </div>
    </div>
  );
};
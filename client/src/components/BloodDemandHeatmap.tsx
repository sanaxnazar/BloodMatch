import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

interface BloodDemandData {
  location: string;
  bloodType: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  unitsNeeded: number;
  timePosted: string;
  hospitalName: string;
}

const BloodDemandHeatmap: React.FC = () => {
  const [demandData, setDemandData] = useState<BloodDemandData[]>([]);
  const [selectedBloodType, setSelectedBloodType] = useState<string>('all');

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = (): BloodDemandData[] => {
      const locations = ['Downtown', 'North Side', 'East End', 'West Hills', 'Central'];
      const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
      const urgencies: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];
      const hospitals = ['General Hospital', 'Emergency Center', 'Medical Center', 'Regional Hospital', 'Community Hospital'];
      
      return Array.from({ length: 12 }, (_, i) => ({
        location: locations[Math.floor(Math.random() * locations.length)],
        bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
        urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
        unitsNeeded: Math.floor(Math.random() * 10) + 1,
        timePosted: `${Math.floor(Math.random() * 60)} min ago`,
        hospitalName: hospitals[Math.floor(Math.random() * hospitals.length)]
      }));
    };

    setDemandData(generateMockData());
    
    // Update data every 30 seconds to simulate real-time
    const interval = setInterval(() => {
      setDemandData(generateMockData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600 text-white animate-pulse';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="h-3 w-3" />;
      case 'high': return <TrendingUp className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const bloodTypes = ['all', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  
  const filteredData = selectedBloodType === 'all' 
    ? demandData 
    : demandData.filter(item => item.bloodType === selectedBloodType);

  const criticalCount = demandData.filter(item => item.urgency === 'critical').length;

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="text-blue-700 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Blood Demand Heatmap
          {criticalCount > 0 && (
            <Badge className="bg-red-600 text-white animate-pulse ml-2">
              {criticalCount} Critical
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Real-time blood requests from hospitals and medical centers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Blood Type Filter */}
        <div className="flex flex-wrap gap-2">
          {bloodTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedBloodType(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedBloodType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>

        {/* Demand Cards */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No current demands for {selectedBloodType === 'all' ? 'any blood type' : selectedBloodType}
            </div>
          ) : (
            filteredData.map((demand, index) => (
              <div 
                key={index}
                className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{demand.location}</span>
                    <Badge className={getUrgencyColor(demand.urgency)}>
                      {getUrgencyIcon(demand.urgency)}
                      <span className="ml-1 capitalize">{demand.urgency}</span>
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">{demand.timePosted}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">{demand.hospitalName}</div>
                    <div className="font-semibold text-red-600">
                      {demand.bloodType} • {demand.unitsNeeded} units needed
                    </div>
                  </div>
                  
                  {demand.urgency === 'critical' && (
                    <div className="text-right">
                      <div className="text-xs text-red-600 font-medium">URGENT</div>
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-xs text-gray-500 text-center pt-2 border-t">
          Updates every 30 seconds • Showing live hospital requests
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodDemandHeatmap;
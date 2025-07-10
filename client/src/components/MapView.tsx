
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Users, Navigation } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  type: 'donor' | 'seeker' | 'center';
  bloodGroup: string;
  lat: number;
  lng: number;
  distance: string;
  urgency?: 'critical' | 'normal';
  available?: boolean;
}

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Mock locations data
  const locations: Location[] = [
    {
      id: '1',
      name: 'John Doe (You)',
      type: 'donor',
      bloodGroup: 'O+',
      lat: 37.7749,
      lng: -122.4194,
      distance: '0 miles',
      available: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      type: 'seeker',
      bloodGroup: 'O+',
      lat: 37.7849,
      lng: -122.4094,
      distance: '2.1 miles',
      urgency: 'critical'
    },
    {
      id: '3',
      name: 'SF General Hospital',
      type: 'center',
      bloodGroup: 'All Types',
      lat: 37.7649,
      lng: -122.4294,
      distance: '1.5 miles'
    },
    {
      id: '4',
      name: 'Michael Chen',
      type: 'donor',
      bloodGroup: 'A+',
      lat: 37.7949,
      lng: -122.3994,
      distance: '3.2 miles',
      available: true
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'donor':
        return <Heart className="w-4 h-4 text-green-600" />;
      case 'seeker':
        return <Users className="w-4 h-4 text-red-600" />;
      case 'center':
        return <MapPin className="w-4 h-4 text-blue-600" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getLocationColor = (location: Location) => {
    if (location.type === 'donor') return location.available ? 'bg-green-500' : 'bg-gray-400';
    if (location.type === 'seeker') return location.urgency === 'critical' ? 'bg-red-600' : 'bg-red-400';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            <span>Live Map View</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map placeholder - In a real app, this would be an actual map */}
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-lg">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600 mb-4">
                  This would display a real map with donor and seeker locations using MapKit or Google Maps API
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                  <Navigation className="w-4 h-4 mr-2" />
                  Enable Location
                </Button>
              </div>
            </div>
            
            {/* Mock location pins */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`absolute w-4 h-4 rounded-full ${getLocationColor(location)} border-2 border-white shadow-lg cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`
                }}
                onClick={() => setSelectedLocation(location)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location List */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedLocation?.id === location.id 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getLocationIcon(location.type)}
                  <div>
                    <p className="font-medium text-gray-900">{location.name}</p>
                    <p className="text-sm text-gray-600">{location.distance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={location.type === 'donor' ? 'secondary' : location.urgency === 'critical' ? 'destructive' : 'default'}
                    className="mb-1"
                  >
                    {location.bloodGroup}
                  </Badge>
                  {location.type === 'seeker' && location.urgency && (
                    <p className="text-xs text-red-600 capitalize">{location.urgency}</p>
                  )}
                  {location.type === 'donor' && (
                    <p className="text-xs text-green-600">
                      {location.available ? 'Available' : 'Unavailable'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Urgency Heatmap */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-red-600 rounded" />
            <span>Urgency Heatmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-red-900">Downtown Area</p>
                <p className="text-sm text-red-700">High demand for O+ blood</p>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-900">Mission District</p>
                <p className="text-sm text-yellow-700">Moderate demand for A- blood</p>
              </div>
              <Badge variant="secondary">Moderate</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Richmond Area</p>
                <p className="text-sm text-green-700">Well supplied</p>
              </div>
              <Badge variant="outline" className="border-green-200 text-green-700">Normal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Star, Clock, Heart, Award } from 'lucide-react';

interface DonorStats {
  totalDonations: number;
  responseRate: number;
  reliability: number;
  lastDonation: string;
  isVerified: boolean;
}

interface DonorTrustScoreProps {
  donorStats: DonorStats;
  compact?: boolean;
}

const DonorTrustScore: React.FC<DonorTrustScoreProps> = ({ donorStats, compact = false }) => {
  const calculateTrustScore = (stats: DonorStats): number => {
    let score = 0;
    
    // Base score from donations (max 40 points)
    score += Math.min(stats.totalDonations * 8, 40);
    
    // Response rate (max 30 points)
    score += stats.responseRate * 0.3;
    
    // Reliability (max 20 points)
    score += stats.reliability * 0.2;
    
    // Verification bonus (10 points)
    if (stats.isVerified) score += 10;
    
    return Math.min(Math.round(score), 100);
  };

  const getTrustLevel = (score: number): { level: string; color: string; icon: React.ReactNode } => {
    if (score >= 90) return { 
      level: "Platinum Donor", 
      color: "bg-purple-600", 
      icon: <Award className="h-4 w-4" /> 
    };
    if (score >= 75) return { 
      level: "Gold Donor", 
      color: "bg-yellow-600", 
      icon: <Star className="h-4 w-4" /> 
    };
    if (score >= 60) return { 
      level: "Silver Donor", 
      color: "bg-gray-500", 
      icon: <Shield className="h-4 w-4" /> 
    };
    if (score >= 40) return { 
      level: "Bronze Donor", 
      color: "bg-orange-600", 
      icon: <Heart className="h-4 w-4" /> 
    };
    return { 
      level: "New Donor", 
      color: "bg-blue-600", 
      icon: <Clock className="h-4 w-4" /> 
    };
  };

  const trustScore = calculateTrustScore(donorStats);
  const trustLevel = getTrustLevel(trustScore);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge className={`${trustLevel.color} text-white`}>
          {trustLevel.icon}
          <span className="ml-1">{trustScore}%</span>
        </Badge>
        <span className="text-sm text-gray-600">{trustLevel.level}</span>
      </div>
    );
  }

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="text-green-700 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Donor Trust Score
        </CardTitle>
        <CardDescription>
          Based on donation history, reliability, and verification status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-700 mb-2">{trustScore}%</div>
          <Badge className={`${trustLevel.color} text-white px-3 py-1`}>
            {trustLevel.icon}
            <span className="ml-2">{trustLevel.level}</span>
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Donation History</span>
              <span>{donorStats.totalDonations} donations</span>
            </div>
            <Progress 
              value={Math.min((donorStats.totalDonations / 5) * 100, 100)} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Response Rate</span>
              <span>{donorStats.responseRate}%</span>
            </div>
            <Progress 
              value={donorStats.responseRate} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Reliability</span>
              <span>{donorStats.reliability}%</span>
            </div>
            <Progress 
              value={donorStats.reliability} 
              className="h-2"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 pt-2 border-t">
          <span>Last Donation:</span>
          <span>{donorStats.lastDonation}</span>
        </div>

        {donorStats.isVerified && (
          <Badge variant="outline" className="w-full justify-center border-green-500 text-green-700">
            <Shield className="h-3 w-3 mr-1" />
            Verified Donor
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default DonorTrustScore;
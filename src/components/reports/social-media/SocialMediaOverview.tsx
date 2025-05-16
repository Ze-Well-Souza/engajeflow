
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface SocialMediaOverviewProps {
  engagementData: any[];
  reachData: any[];
}

// Dados de exemplo
const mockEngagementData = [
  { name: "Jan", instagram: 65, facebook: 48, youtube: 30 },
  { name: "Fev", instagram: 59, facebook: 42, youtube: 31 },
  { name: "Mar", instagram: 80, facebook: 35, youtube: 40 },
  { name: "Abr", instagram: 81, facebook: 60, youtube: 41 },
  { name: "Mai", instagram: 56, facebook: 45, youtube: 37 },
  { name: "Jun", instagram: 55, facebook: 48, youtube: 39 },
];

const mockReachData = [
  { name: "Jan", instagram: 4000, facebook: 2400, youtube: 1200 },
  { name: "Fev", instagram: 3000, facebook: 1398, youtube: 2210 },
  { name: "Mar", instagram: 2000, facebook: 9800, youtube: 2290 },
  { name: "Abr", instagram: 2780, facebook: 3908, youtube: 2000 },
  { name: "Mai", instagram: 1890, facebook: 4800, youtube: 2181 },
  { name: "Jun", instagram: 2390, facebook: 3800, youtube: 2500 },
];

const SocialMediaOverview: React.FC<Partial<SocialMediaOverviewProps>> = ({
  engagementData = mockEngagementData,
  reachData = mockReachData
}) => {
  return (
    <div className="space-y-4">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={engagementData}
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="instagram" fill="#8a3cf3" name="Instagram" />
            <Bar dataKey="facebook" fill="#3b5998" name="Facebook" />
            <Bar dataKey="youtube" fill="#c4302b" name="YouTube" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SocialMediaOverview;

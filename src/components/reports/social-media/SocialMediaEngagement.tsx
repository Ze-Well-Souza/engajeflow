
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface EngagementDataPoint {
  name: string;
  engagementRate: number;
  comments: number;
  shares: number;
}

interface SocialMediaEngagementProps {
  data: EngagementDataPoint[];
}

const SocialMediaEngagement: React.FC<SocialMediaEngagementProps> = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="engagementRate" name="Taxa de Engajamento (%)" fill="#8884d8" />
          <Bar dataKey="comments" name="Comentários" fill="#82ca9d" />
          <Bar dataKey="shares" name="Compartilhamentos" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SocialMediaEngagement;

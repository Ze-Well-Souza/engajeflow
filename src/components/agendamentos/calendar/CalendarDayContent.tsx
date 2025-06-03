
import React from "react";
import { ScheduledPost } from "@/hooks/useScheduledPosts";

interface CalendarDayContentProps {
  date: Date;
  posts: ScheduledPost[];
}

const CalendarDayContent: React.FC<CalendarDayContentProps> = ({ date, posts }) => {
  if (posts.length === 0) return null;

  // Agrupar por plataforma
  const platforms: Record<string, number> = {};
  posts.forEach(post => {
    platforms[post.platform] = (platforms[post.platform] || 0) + 1;
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 pb-0.5">
      {Object.entries(platforms).map(([platform, count], index) => (
        <div 
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${
            platform === 'instagram' ? 'bg-pink-500' :
            platform === 'facebook' ? 'bg-blue-500' :
            platform === 'youtube' ? 'bg-red-500' : 'bg-gray-500'
          }`}
          title={`${count} post(s) no ${platform}`}
        />
      ))}
    </div>
  );
};

export default CalendarDayContent;

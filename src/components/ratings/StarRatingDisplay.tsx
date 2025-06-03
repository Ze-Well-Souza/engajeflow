
import React from "react";
import { Star } from "lucide-react";

interface StarRatingDisplayProps {
  value: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
}

export const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({
  value,
  maxStars = 5,
  size = "md"
}) => {
  const starSizeClass = 
    size === "sm" ? "w-3 h-3" :
    size === "lg" ? "w-6 h-6" : 
    "w-4 h-4";

  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={`star-display-${i}`}
            className={`
              ${starSizeClass}
              ${starValue <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} 
            `}
          />
        );
      })}
    </div>
  );
};

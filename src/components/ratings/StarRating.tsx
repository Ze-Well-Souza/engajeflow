
import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  maxStars?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  maxStars = 5,
  onChange,
  readOnly = false,
  size = "md"
}) => {
  const starSizeClass = 
    size === "sm" ? "w-3 h-3" :
    size === "lg" ? "w-6 h-6" : 
    "w-4 h-4";

  const handleStarClick = (starValue: number) => {
    if (readOnly) return;
    if (onChange) onChange(starValue);
  };

  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={`star-${i}`}
            className={`
              ${starSizeClass}
              ${starValue <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} 
              ${!readOnly ? "cursor-pointer hover:scale-110 transition-transform" : ""}
            `}
            onClick={() => handleStarClick(starValue)}
          />
        );
      })}
    </div>
  );
};

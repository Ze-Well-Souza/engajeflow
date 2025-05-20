
import React from "react";
import { Star } from "lucide-react";

interface StarRatingInputProps {
  value: number;
  maxStars?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
  value,
  maxStars = 5,
  onChange,
  size = "md"
}) => {
  const starSizeClass = 
    size === "sm" ? "w-3 h-3" :
    size === "lg" ? "w-6 h-6" : 
    "w-4 h-4";

  const handleStarClick = (starValue: number) => {
    onChange(starValue);
  };

  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={`star-input-${i}`}
            className={`
              ${starSizeClass}
              ${starValue <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
              cursor-pointer hover:scale-110 transition-transform
            `}
            onClick={() => handleStarClick(starValue)}
          />
        );
      })}
    </div>
  );
};

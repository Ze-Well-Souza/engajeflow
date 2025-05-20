
import React from "react";
import { StarRatingDisplay } from "@/components/ratings/StarRatingDisplay";
import { StarRatingInput } from "@/components/ratings/StarRatingInput";

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
  if (readOnly || !onChange) {
    return (
      <StarRatingDisplay 
        value={value} 
        maxStars={maxStars} 
        size={size} 
      />
    );
  }

  return (
    <StarRatingInput
      value={value}
      maxStars={maxStars}
      onChange={onChange}
      size={size}
    />
  );
};


import React from "react";
import { ServiceRating } from "@/hooks/useServiceRatings";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface RatingsOverviewProps {
  ratings: ServiceRating[];
  onFilterChange?: (rating: number | undefined) => void;
}

export const RatingsOverview: React.FC<RatingsOverviewProps> = ({
  ratings,
  onFilterChange
}) => {
  // Calculamos o número de cada classificação por estrela
  const ratingCounts = {
    5: ratings.filter(r => r.rating === 5).length,
    4: ratings.filter(r => r.rating === 4).length,
    3: ratings.filter(r => r.rating === 3).length,
    2: ratings.filter(r => r.rating === 2).length,
    1: ratings.filter(r => r.rating === 1).length
  };
  
  // Calculamos a média de avaliações
  const calculateAverage = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };
  
  const averageRating = calculateAverage();
  
  // Calculamos a porcentagem para cada nível de estrela
  const getPercentage = (count: number) => {
    if (ratings.length === 0) return 0;
    return (count / ratings.length) * 100;
  };
  
  const handleFilterClick = (rating: number | undefined) => {
    if (onFilterChange) {
      onFilterChange(rating);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Avaliações</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resumo da avaliação média */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl font-bold">{averageRating}</div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map(i => (
              <Star 
                key={i}
                className={`w-5 h-5 ${i <= Math.round(parseFloat(averageRating)) 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-muted-foreground"}`} 
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Baseado em {ratings.length} {ratings.length === 1 ? 'avaliação' : 'avaliações'}
          </div>
        </div>
        
        {/* Distribuição de avaliações */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="p-0 min-w-[40px] h-6"
                onClick={() => handleFilterClick(rating)}
              >
                {rating} <Star className="w-3 h-3 ml-0.5 inline" />
              </Button>
              <Progress value={getPercentage(ratingCounts[rating as keyof typeof ratingCounts])} className="h-2" />
              <span className="text-sm min-w-[40px]">
                {ratingCounts[rating as keyof typeof ratingCounts]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

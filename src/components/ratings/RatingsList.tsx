
import React from "react";
import { ServiceRating } from "@/hooks/useServiceRatings";
import { RatingCard } from "@/components/ratings/RatingCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface RatingsListProps {
  ratings: ServiceRating[];
  isLoading: boolean;
  onAddResponse?: (ratingId: string, response: string) => Promise<boolean>;
  onToggleHighlight?: (ratingId: string) => Promise<boolean>;
  onRatingFilterChange?: (rating: number | undefined) => void;
}

export const RatingsList: React.FC<RatingsListProps> = ({
  ratings,
  isLoading,
  onAddResponse,
  onToggleHighlight,
  onRatingFilterChange
}) => {
  const handleFilterChange = (value: string) => {
    if (onRatingFilterChange) {
      if (value === "all") {
        onRatingFilterChange(undefined);
      } else {
        onRatingFilterChange(parseInt(value));
      }
    }
  };
  
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };
  
  const averageRating = calculateAverageRating();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">
            Avaliações ({ratings.length})
            {ratings.length > 0 && (
              <span className="ml-2 text-sm">
                Média: {averageRating} de 5
              </span>
            )}
          </h3>
        </div>
        
        <Tabs defaultValue="all" onValueChange={handleFilterChange}>
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="5">5★</TabsTrigger>
            <TabsTrigger value="4">4★</TabsTrigger>
            <TabsTrigger value="3">3★</TabsTrigger>
            <TabsTrigger value="2">2★</TabsTrigger>
            <TabsTrigger value="1">1★</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p>Carregando avaliações...</p>
        </div>
      ) : ratings.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhuma avaliação encontrada.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ratings.map((rating) => (
            <RatingCard
              key={rating.id}
              rating={rating}
              onAddResponse={onAddResponse}
              onToggleHighlight={onToggleHighlight}
              showResponseForm={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingsOverview } from "@/components/ratings/RatingsOverview";
import { RatingCard } from "@/components/ratings/RatingCard";
import { useServiceRatings } from "@/hooks/useServiceRatings";

// Cliente temporário fixo para demonstração
const DEMO_PROFESSIONAL_ID = "00000000-0000-0000-0000-000000000000";

const SocialMediaRatings: React.FC = () => {
  const { ratings, isLoading } = useServiceRatings(DEMO_PROFESSIONAL_ID);
  
  // Filtrar apenas as avaliações destacadas para mostrar
  const highlightedRatings = ratings.filter(rating => rating.highlighted);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Resumo das Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <RatingsOverview ratings={ratings} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Destacadas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Carregando avaliações...</p>
            </div>
          ) : highlightedRatings.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              <p>Nenhuma avaliação destacada.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {highlightedRatings.map(rating => (
                <RatingCard 
                  key={rating.id} 
                  rating={rating}
                  showResponseForm={false}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaRatings;

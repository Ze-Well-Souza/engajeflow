
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServiceRatings } from "@/hooks/useServiceRatings";
import { RatingsList } from "@/components/ratings/RatingsList";
import { RatingsOverview } from "@/components/ratings/RatingsOverview";
import { CreateRatingForm } from "@/components/ratings/CreateRatingForm";

// Cliente temporário fixo para demonstração
const DEMO_PROFESSIONAL_ID = "00000000-0000-0000-0000-000000000000";

const RatingsPage: React.FC = () => {
  const {
    ratings,
    isLoading,
    filters,
    setFilters,
    addRatingResponse,
    toggleHighlight,
    refetchRatings
  } = useServiceRatings(DEMO_PROFESSIONAL_ID);
  
  const handleRatingFilter = (rating: number | undefined) => {
    setFilters({ ...filters, rating });
  };
  
  const handleHighlightChange = (highlighted: boolean | undefined) => {
    setFilters({ ...filters, highlighted });
  };
  
  const handleRatingCreated = () => {
    refetchRatings();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Avaliações</h1>
      
      <RatingsOverview 
        ratings={ratings} 
        onFilterChange={handleRatingFilter}
      />
      
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Todas as Avaliações</TabsTrigger>
          <TabsTrigger value="highlighted">Avaliações Destacadas</TabsTrigger>
          <TabsTrigger value="add">Adicionar Avaliação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <RatingsList 
            ratings={ratings}
            isLoading={isLoading}
            onAddResponse={addRatingResponse}
            onToggleHighlight={toggleHighlight}
            onRatingFilterChange={handleRatingFilter}
          />
        </TabsContent>
        
        <TabsContent value="highlighted">
          <RatingsList 
            ratings={ratings.filter(r => r.highlighted)}
            isLoading={isLoading}
            onAddResponse={addRatingResponse}
            onToggleHighlight={toggleHighlight}
          />
        </TabsContent>
        
        <TabsContent value="add">
          <div className="max-w-md mx-auto">
            <CreateRatingForm 
              serviceId="service-demo"
              professionalId={DEMO_PROFESSIONAL_ID}
              onRatingCreated={handleRatingCreated}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RatingsPage;

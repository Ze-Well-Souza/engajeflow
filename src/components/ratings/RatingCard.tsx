
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ServiceRating } from "@/hooks/useServiceRatings";
import { StarRating } from "@/components/ratings/StarRating";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Star, MessageSquare } from "lucide-react";

interface RatingCardProps {
  rating: ServiceRating;
  onAddResponse?: (ratingId: string, response: string) => Promise<boolean>;
  onToggleHighlight?: (ratingId: string) => Promise<boolean>;
  showResponseForm?: boolean;
}

export const RatingCard: React.FC<RatingCardProps> = ({
  rating,
  onAddResponse,
  onToggleHighlight,
  showResponseForm = false
}) => {
  const [isResponding, setIsResponding] = useState(false);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleToggleResponseForm = () => {
    if (!rating.response) {
      setIsResponding(!isResponding);
    }
  };
  
  const handleSubmitResponse = async () => {
    if (!response.trim() || !onAddResponse) return;
    
    setIsSubmitting(true);
    const success = await onAddResponse(rating.id, response);
    
    if (success) {
      setIsResponding(false);
      setResponse("");
    }
    
    setIsSubmitting(false);
  };
  
  const handleToggleHighlight = async () => {
    if (!onToggleHighlight) return;
    await onToggleHighlight(rating.id);
  };
  
  const timeAgo = formatDistanceToNow(new Date(rating.createdAt), {
    addSuffix: true,
    locale: ptBR
  });
  
  return (
    <Card className={`${rating.highlighted ? "border-primary" : "border-border"}`}>
      <CardHeader className="flex flex-row justify-between items-start pb-2">
        <div>
          <StarRating value={rating.rating} readOnly />
          <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
        </div>
        
        {onToggleHighlight && (
          <Button
            variant="ghost"
            size="icon"
            title={rating.highlighted ? "Remover destaque" : "Destacar avaliação"}
            onClick={handleToggleHighlight}
          >
            <Star 
              className={`h-4 w-4 ${rating.highlighted ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} 
            />
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm">{rating.comment}</p>
        
        {rating.response && (
          <div className="mt-4 pt-2 border-t">
            <p className="text-sm font-medium">Sua resposta:</p>
            <p className="text-sm text-muted-foreground mt-1">{rating.response}</p>
          </div>
        )}
      </CardContent>
      
      {(showResponseForm && !rating.response) && (
        <CardFooter className="flex flex-col items-stretch">
          {isResponding ? (
            <>
              <Textarea
                placeholder="Escreva sua resposta a este comentário..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-[80px] mb-2"
              />
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsResponding(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSubmitResponse}
                  disabled={!response.trim() || isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Responder"}
                </Button>
              </div>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleToggleResponseForm}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Responder
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

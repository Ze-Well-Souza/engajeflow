
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ratings/StarRating";
import { toast } from 'sonner';

interface CreateRatingFormProps {
  serviceId: string;
  professionalId: string;
  onRatingCreated?: () => void;
}

export const CreateRatingForm: React.FC<CreateRatingFormProps> = ({
  serviceId,
  professionalId,
  onRatingCreated
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Por favor, selecione uma classificação");
      return;
    }
    
    if (!comment.trim()) {
      toast.error("Por favor, escreva um comentário");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulando envio para a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Avaliação enviada com sucesso!");
      
      // Resetar o formulário
      setRating(0);
      setComment("");
      
      // Notificar o componente pai
      if (onRatingCreated) {
        onRatingCreated();
      }
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      toast.error("Não foi possível enviar sua avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avaliar serviço</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <p className="mb-2">Como você avalia este serviço?</p>
          <StarRating 
            value={rating} 
            onChange={setRating} 
            size="lg" 
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Compartilhe sua experiência com este serviço..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0 || !comment.trim()}
        >
          {isSubmitting ? "Enviando..." : "Enviar avaliação"}
        </Button>
      </CardFooter>
    </Card>
  );
};


import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Lightbulb, Clock, Share2 } from "lucide-react";
import { MediaSuggestion } from './types';

interface SuggestionViewProps {
  suggestion: MediaSuggestion;
  index: number;
}

export const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "instagram":
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
    case "facebook":
      return "bg-blue-600 text-white";
    case "tiktok":
      return "bg-black text-white";
    case "whatsapp":
      return "bg-green-500 text-white";
    case "youtube":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-200";
  }
};

export const getPlatformIcon = (platform: string) => {
  return <Share2 className="h-4 w-4" />;
};

const SuggestionView: React.FC<SuggestionViewProps> = ({ suggestion, index }) => {
  return (
    <TabsContent key={index} value={suggestion.platform}>
      <div className="space-y-4">
        <Badge className={`${getPlatformColor(suggestion.platform)} p-2`}>
          {getPlatformIcon(suggestion.platform)}
          {suggestion.platform.charAt(0).toUpperCase() + suggestion.platform.slice(1)}
        </Badge>
        
        <div className="bg-muted rounded-md p-4">
          <h4 className="font-medium mb-2">Conteúdo sugerido:</h4>
          <p className="text-sm">{suggestion.content}</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Melhor momento: {suggestion.bestTime}</span>
        </div>
        
        {suggestion.hashtags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Hashtags recomendadas:</h4>
            <div className="flex flex-wrap gap-1">
              {suggestion.hashtags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-2 mt-2 bg-amber-50 p-3 rounded-md">
          <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5" />
          <p className="text-xs">{suggestion.reasoning}</p>
        </div>
      </div>
    </TabsContent>
  );
};

export default SuggestionView;

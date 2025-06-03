
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaSuggestion } from './types';
import SuggestionView from './SuggestionView';

interface SuggestionsDisplayProps {
  suggestions: MediaSuggestion[];
}

const SuggestionsDisplay: React.FC<SuggestionsDisplayProps> = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Com base no seu tipo de negócio, identificamos estas estratégias 
        de conteúdo para diferentes plataformas:
      </p>
      
      <Tabs defaultValue={suggestions[0].platform} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          {suggestions.map((suggestion, index) => (
            <TabsTrigger 
              key={index} 
              value={suggestion.platform}
              className="text-xs"
            >
              {suggestion.platform.charAt(0).toUpperCase() + suggestion.platform.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {suggestions.map((suggestion, index) => (
          <SuggestionView key={index} suggestion={suggestion} index={index} />
        ))}
      </Tabs>
    </div>
  );
};

export default SuggestionsDisplay;

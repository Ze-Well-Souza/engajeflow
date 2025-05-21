
export interface MediaSuggestion {
  platform: "instagram" | "facebook" | "tiktok" | "whatsapp" | "youtube";
  content: string;
  bestTime: string;
  hashtags: string[];
  reasoning: string;
}

export interface MediaConsultantWidgetProps {
  businessType?: string;
  onSuggestionGenerated?: (suggestion: string) => void;
}

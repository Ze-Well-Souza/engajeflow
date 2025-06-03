
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ScheduleFormProps {
  selectedPlatform: string;
  scheduledDate: string;
  scheduledTime: string;
  postCaption: string;
  postHashtags: string;
  isSubmitting: boolean;
  isUploading: boolean;
  progress: number;
  onPlatformChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onCaptionChange: (value: string) => void;
  onHashtagsChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  selectedPlatform,
  scheduledDate,
  scheduledTime,
  postCaption,
  postHashtags,
  isSubmitting,
  isUploading,
  progress,
  onPlatformChange,
  onDateChange,
  onTimeChange,
  onCaptionChange,
  onHashtagsChange,
  onSubmit,
  disabled
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamento</CardTitle>
        <CardDescription>
          Configure quando e onde sua mídia será publicada.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="platform">Plataforma</Label>
            <Select value={selectedPlatform} onValueChange={onPlatformChange}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Selecione a plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduled-date">Data</Label>
              <Input
                id="scheduled-date"
                type="date"
                value={scheduledDate}
                onChange={(e) => onDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="scheduled-time">Hora</Label>
              <Input
                id="scheduled-time"
                type="time"
                value={scheduledTime}
                onChange={(e) => onTimeChange(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="post-caption">Legenda</Label>
            <Textarea
              id="post-caption"
              value={postCaption}
              onChange={(e) => onCaptionChange(e.target.value)}
              placeholder="Digite a legenda que será postada junto com sua mídia"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="post-hashtags">Hashtags</Label>
            <Input
              id="post-hashtags"
              value={postHashtags}
              onChange={(e) => onHashtagsChange(e.target.value)}
              placeholder="#hashtag1 #hashtag2 #hashtag3"
            />
          </div>

          <div className="pt-4">
            <Button 
              className="w-full" 
              onClick={onSubmit}
              disabled={disabled || isUploading || isSubmitting}
            >
              {(isUploading || isSubmitting) && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></span>
              )}
              {isUploading 
                ? `Enviando... ${Math.round(progress)}%` 
                : isSubmitting 
                  ? 'Agendando...' 
                  : 'Agendar Publicação'
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleForm;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Clock, Image, Check, X, Facebook, Instagram, Twitter, Youtube, CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SocialAccount } from "@/services/social/SocialAuthService";

interface MultiChannelPublisherProps {
  accounts?: SocialAccount[];
}

const MultiChannelPublisher: React.FC<MultiChannelPublisherProps> = ({ accounts = [] }) => {
  const [postContent, setPostContent] = useState("");
  const [postMedia, setPostMedia] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState("12:00");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({
    instagram: true,
    facebook: true,
    twitter: false,
    youtube: false
  });
  
  const handleTogglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };
  
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newFiles: File[] = Array.from(files);
    setPostMedia(prev => [...prev, ...newFiles]);
    
    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };
  
  const removeMedia = (index: number) => {
    const newMedia = [...postMedia];
    const newPreviewUrls = [...previewUrls];
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    newMedia.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setPostMedia(newMedia);
    setPreviewUrls(newPreviewUrls);
  };
  
  const handlePublish = () => {
    const selectedCount = Object.values(selectedPlatforms).filter(Boolean).length;
    
    if (!postContent && postMedia.length === 0) {
      toast.error("Adicione texto ou mídia para publicar");
      return;
    }
    
    if (selectedCount === 0) {
      toast.error("Selecione pelo menos uma plataforma");
      return;
    }
    
    const publishType = isScheduled ? "agendada" : "imediata";
    
    let scheduleInfo = "";
    if (isScheduled && scheduledDate) {
      const formattedDate = format(scheduledDate, "dd/MM/yyyy");
      scheduleInfo = ` para ${formattedDate} às ${scheduledTime}`;
    }
    
    const platformsList = Object.entries(selectedPlatforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform, _]) => platform)
      .join(", ");
    
    toast.success(`Publicação ${publishType}${scheduleInfo} enviada para ${platformsList}`);
    
    // Limpar o formulário
    setPostContent("");
    
    // Limpar previews
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPostMedia([]);
    setPreviewUrls([]);
    
    // Resetar agendamento
    setIsScheduled(false);
    setScheduledDate(undefined);
    setScheduledTime("12:00");
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Publicação Multicanal</CardTitle>
        <CardDescription>
          Crie e agende publicações para todas as suas redes sociais de uma só vez
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="content">Texto da Publicação</Label>
          <Textarea
            id="content"
            placeholder="O que você gostaria de compartilhar?"
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <Label htmlFor="media" className="mb-2 inline-block">Adicionar Mídia</Label>
          <div className="flex flex-wrap gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative rounded-md overflow-hidden h-24 w-24">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6 absolute top-1 right-1 rounded-full"
                  onClick={() => removeMedia(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            <label className="flex items-center justify-center h-24 w-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="file"
                id="media"
                accept="image/*,video/*"
                className="sr-only"
                multiple
                onChange={handleMediaChange}
              />
              <div className="text-center">
                <Image className="h-6 w-6 mx-auto text-gray-400" />
                <span className="text-xs mt-1 text-gray-500">Adicionar</span>
              </div>
            </label>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-3">Plataformas</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { id: "instagram", label: "Instagram", icon: <Instagram className="h-5 w-5" /> },
              { id: "facebook", label: "Facebook", icon: <Facebook className="h-5 w-5" /> },
              { id: "twitter", label: "Twitter", icon: <Twitter className="h-5 w-5" /> },
              { id: "youtube", label: "YouTube", icon: <Youtube className="h-5 w-5" /> }
            ].map(platform => (
              <div
                key={platform.id}
                className={`flex items-center gap-2 p-2 rounded-md border transition-colors cursor-pointer ${
                  selectedPlatforms[platform.id]
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => handleTogglePlatform(platform.id)}
              >
                {platform.icon}
                <span>{platform.label}</span>
                <div
                  className={`h-4 w-4 rounded-full ml-1 flex items-center justify-center ${
                    selectedPlatforms[platform.id]
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  }`}
                >
                  {selectedPlatforms[platform.id] && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              id="scheduled"
              checked={isScheduled}
              onCheckedChange={() => setIsScheduled(!isScheduled)}
            />
            <Label htmlFor="scheduled" className="cursor-pointer">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Agendar publicação
              </span>
            </Label>
          </div>
          
          {isScheduled && (
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "dd/MM/yyyy") : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-[100px]"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button onClick={handlePublish}>
          {isScheduled ? "Agendar Publicação" : "Publicar Agora"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MultiChannelPublisher;

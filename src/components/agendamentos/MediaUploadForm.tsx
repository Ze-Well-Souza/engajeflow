
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface MediaUploadFormProps {
  uploadFile: File | null;
  mediaTitle: string;
  mediaDescription: string;
  mediaType: "video" | "image" | "carousel";
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onMediaTypeChange: (value: "video" | "image" | "carousel") => void;
}

const MediaUploadForm: React.FC<MediaUploadFormProps> = ({
  uploadFile,
  mediaTitle,
  mediaDescription,
  mediaType,
  onFileChange,
  onTitleChange,
  onDescriptionChange,
  onMediaTypeChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload de Mídia</CardTitle>
        <CardDescription>
          Selecione o arquivo que deseja programar para publicação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <input
              type="file"
              id="media-upload"
              accept="image/*,video/*"
              className="hidden"
              onChange={onFileChange}
            />
            <label
              htmlFor="media-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="h-10 w-10 text-gray-500 mb-2" />
              <p className="text-sm font-medium mb-1">
                {uploadFile ? uploadFile.name : 'Clique para selecionar um arquivo'}
              </p>
              <p className="text-xs text-gray-500">
                Formatos suportados: JPG, PNG, MP4, MOV
              </p>
            </label>
          </div>

          <div>
            <Label htmlFor="media-type">Tipo de Mídia</Label>
            <Select 
              value={mediaType} 
              onValueChange={(value) => onMediaTypeChange(value as "video" | "image" | "carousel")}
            >
              <SelectTrigger id="media-type">
                <SelectValue placeholder="Selecione o tipo de mídia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Imagem</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
                <SelectItem value="carousel">Carrossel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="media-title">Título</Label>
            <Input
              id="media-title"
              value={mediaTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Digite um título para identificação"
            />
          </div>

          <div>
            <Label htmlFor="media-description">Descrição (opcional)</Label>
            <Textarea
              id="media-description"
              value={mediaDescription}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Digite uma descrição para identificação interna"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaUploadForm;

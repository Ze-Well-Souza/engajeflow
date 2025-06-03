
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Star, 
  ExternalLink, 
  Users, 
  Calendar, 
  CheckCircle,
  ShieldCheck,
  AlertCircle 
} from "lucide-react";

export interface Extension {
  id: string;
  name: string;
  description: string;
  icon: string;
  author: string;
  rating: number;
  reviews: number;
  price: number | "free";
  installed: boolean;
  version: string;
  lastUpdate: string;
  category: string;
  tags: string[];
  downloads: number;
  verified: boolean;
  compatibility?: "full" | "partial" | "incompatible";
}

interface ExtensionCardProps {
  extension: Extension;
  onInstall: (id: string) => void;
  onUninstall: (id: string) => void;
  onDetails: (id: string) => void;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({
  extension,
  onInstall,
  onUninstall,
  onDetails,
}) => {
  const { 
    id, 
    name, 
    description, 
    icon, 
    author, 
    rating, 
    reviews, 
    price, 
    installed, 
    version, 
    lastUpdate, 
    category,
    tags,
    downloads,
    verified,
    compatibility
  } = extension;
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-muted" />
            <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-muted" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };
  
  const getCompatibilityColor = () => {
    if (!compatibility || compatibility === "full") return "bg-green-500";
    if (compatibility === "partial") return "bg-amber-500";
    return "bg-red-500";
  };
  
  const formatPrice = (price: number | "free") => {
    if (price === "free") return "Grátis";
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-32 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="absolute inset-0 flex items-center justify-center">
            {icon.startsWith("http") ? (
              <img 
                src={icon} 
                alt={name} 
                className="h-16 w-16 object-contain" 
              />
            ) : (
              <div className="h-16 w-16 flex items-center justify-center bg-background rounded-lg text-primary">
                <span className="text-2xl">{icon}</span>
              </div>
            )}
          </div>
          {verified && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-600 text-white px-2 py-1 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                <span className="text-[10px]">Verificado</span>
              </Badge>
            </div>
          )}
          {compatibility && compatibility !== "full" && (
            <div className="absolute top-2 left-2">
              <Badge className={`${getCompatibilityColor()} text-white px-2 py-1 flex items-center gap-1`}>
                {compatibility === "partial" ? (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-[10px]">Compatibilidade Parcial</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-[10px]">Incompatível</span>
                  </>
                )}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold leading-tight">{name}</h3>
          <Badge variant="outline">{category}</Badge>
        </div>
        
        <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-[10px] px-1.5">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-[10px] px-1.5">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-muted-foreground">({reviews})</span>
          </div>
          
          <span className="font-medium">{formatPrice(price)}</span>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{downloads.toLocaleString()} downloads</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>v{version}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs h-8"
          onClick={() => onDetails(id)}
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1" />
          Detalhes
        </Button>
        
        {installed ? (
          <Button 
            variant="destructive" 
            size="sm" 
            className="text-xs h-8"
            onClick={() => onUninstall(id)}
          >
            Desinstalar
          </Button>
        ) : (
          <Button 
            variant={price === "free" ? "default" : "outline"} 
            size="sm" 
            className="text-xs h-8"
            onClick={() => onInstall(id)}
          >
            {price === "free" ? (
              <>
                <Download className="h-3.5 w-3.5 mr-1" />
                Instalar
              </>
            ) : (
              "Comprar"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExtensionCard;


import React, { useEffect, useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

// Definição dos temas disponíveis
const themes = [
  { name: "Padrão", className: "theme-default" },
  { name: "Violeta", className: "theme-violet" },
  { name: "Azul Marinho", className: "theme-navy" },
  { name: "Verde", className: "theme-green" },
  { name: "Alto Contraste", className: "theme-high-contrast" }
];

const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState("theme-default");
  
  useEffect(() => {
    // Recuperar tema do localStorage, se existir
    const savedTheme = localStorage.getItem("app-theme") || "theme-default";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);
  
  const applyTheme = (themeClass: string) => {
    // Remover todos os temas do body
    document.body.classList.remove(...themes.map(t => t.className));
    // Adicionar o tema selecionado
    document.body.classList.add(themeClass);
    // Salvar no localStorage
    localStorage.setItem("app-theme", themeClass);
    setCurrentTheme(themeClass);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          title="Personalizar tema"
          className="rounded-full w-9 h-9"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.className}
            className={`${currentTheme === theme.className ? 'bg-accent font-medium' : ''} cursor-pointer`}
            onClick={() => applyTheme(theme.className)}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;

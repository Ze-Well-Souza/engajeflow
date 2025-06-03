
import React from "react";
import { useLocalization } from "@/contexts/LocalizationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

// Mapeamento de códigos de idioma para seus nomes
const localeNames: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

// Mapeamento de códigos de idioma para emojis de bandeira
const localeFlags: Record<string, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
};

interface LocaleSwitcherProps {
  variant?: "icon" | "full" | "minimal";
}

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({ variant = "icon" }) => {
  const { locale, setLocale, localeOptions } = useLocalization();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "icon" ? "icon" : "sm"}
          className="flex items-center gap-2"
        >
          {variant === "icon" ? (
            <Globe className="h-5 w-5" />
          ) : variant === "full" ? (
            <>
              <Globe className="h-4 w-4" />
              <span>{localeNames[locale]}</span>
              <span>{localeFlags[locale]}</span>
            </>
          ) : (
            <span>{localeFlags[locale]}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {localeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLocale(option.value)}
            className={locale === option.value ? "bg-accent" : ""}
          >
            <span className="mr-2">{option.flag}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;

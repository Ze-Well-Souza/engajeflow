
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface SearchInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchInput = ({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  className = "" 
}: SearchInputProps) => {
  return (
    <div className={`flex gap-4 items-end ${className}`}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id={id} 
            placeholder={placeholder} 
            className="pl-8" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const ThemeSelector: React.FC = () => {
  return (
    <Button variant="outline" size="sm">
      <Palette className="h-4 w-4 mr-2" />
      Tema
    </Button>
  );
};

export default ThemeSelector;


import React from 'react';
import { Badge } from '@/components/ui/badge';

interface MessageTypeTagProps {
  type: string;
}

const MessageTypeTag: React.FC<MessageTypeTagProps> = ({ type }) => {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'boas-vindas':
        return { variant: 'default', label: 'Boas-vindas' };
      case 'promocao':
        return { variant: 'destructive', label: 'Promoção' };
      case 'confirmacao':
        return { variant: 'outline', label: 'Confirmação' };
      case 'agradecimento':
        return { variant: 'secondary', label: 'Agradecimento' };
      case 'notificacao':
        return { variant: 'outline', label: 'Notificação' };
      case 'instrucoes':
        return { variant: 'default', label: 'Instruções' };
      case 'personalizada':
        return { variant: 'outline', label: 'Personalizada' };
      default:
        return { variant: 'secondary', label: type };
    }
  };

  const config = getTypeConfig(type);

  return (
    <Badge variant={config.variant as any}>
      {config.label}
    </Badge>
  );
};

export default MessageTypeTag;

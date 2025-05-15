
import React from "react";
import { cn } from "@/lib/utils";

interface MessageTypeProps {
  type:
    | "boas-vindas"
    | "promocao"
    | "confirmacao"
    | "agradecimento"
    | "notificacao"
    | "instrucoes"
    | "personalizada";
  className?: string;
}

const typeColors = {
  "boas-vindas": "bg-message-type-welcome text-white",
  "promocao": "bg-message-type-promotion text-white",
  "confirmacao": "bg-message-type-confirmation text-white",
  "agradecimento": "bg-message-type-thanks text-white",
  "notificacao": "bg-message-type-notification text-white",
  "instrucoes": "bg-message-type-instructions text-white",
  "personalizada": "bg-message-type-personalized text-white",
};

const typeNames = {
  "boas-vindas": "Boas-vindas",
  "promocao": "Promoção",
  "confirmacao": "Confirmação",
  "agradecimento": "Agradecimento",
  "notificacao": "Notificação",
  "instrucoes": "Instruções",
  "personalizada": "Personalizada",
};

const MessageTypeTag: React.FC<MessageTypeProps> = ({ type, className }) => {
  return (
    <div
      className={cn(
        "px-3 py-1 rounded-md text-xs font-medium inline-block",
        typeColors[type],
        className
      )}
    >
      {typeNames[type]}
    </div>
  );
};

export default MessageTypeTag;

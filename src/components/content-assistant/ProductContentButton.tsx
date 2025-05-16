
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import ContentAssistantModal from "./ContentAssistantModal";

interface ProductContentButtonProps extends ButtonProps {
  productInfo: {
    id?: string;
    name: string;
    description?: string;
    imageUrl?: string;
  };
  onContentSaved?: (content: any) => void;
}

const ProductContentButton: React.FC<ProductContentButtonProps> = ({
  productInfo,
  onContentSaved,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button 
        onClick={handleOpenModal}
        className="gap-1"
        {...props}
      >
        <Sparkles className="h-4 w-4" />
        Assistente IA
      </Button>
      
      <ContentAssistantModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        productInfo={productInfo}
        onSaveContent={onContentSaved}
      />
    </>
  );
};

export default ProductContentButton;

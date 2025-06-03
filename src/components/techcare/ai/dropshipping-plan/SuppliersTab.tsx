
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SupplierInfo } from './types';

interface SuppliersTabProps {
  suppliers: SupplierInfo[];
}

const SuppliersTab: React.FC<SuppliersTabProps> = ({ suppliers }) => {
  return (
    <TabsContent value="suppliers" className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">
        Fornecedores recomendados para os nichos sugeridos:
      </p>
      
      {suppliers.map((supplier, index) => (
        <div key={index} className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{supplier.name}</h4>
            <Badge className="bg-purple-100 text-purple-800">
              {supplier.platform}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div>
              <span className="text-muted-foreground">Pedido mínimo:</span>
              <span className="font-medium ml-1">{supplier.minOrderValue}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Prazo de entrega:</span>
              <span className="font-medium ml-1">{supplier.shippingTime}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Avaliação:</span>
              <span className="font-medium ml-1">{supplier.rating}/5</span>
            </div>
          </div>
          
          <div className="mt-2">
            <h5 className="text-xs font-medium mb-1">Vantagens:</h5>
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
              {supplier.advantages.map((advantage, aIndex) => (
                <li key={aIndex}>{advantage}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </TabsContent>
  );
};

export default SuppliersTab;

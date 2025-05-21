
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";

// Dados simulados
const mockPayables = [
  { 
    id: 1, 
    description: "Fornecedor de produtos - NF 8754", 
    supplier: "Distribuidora ABC", 
    value: 1250.00, 
    dueDate: "2025-06-05", 
    status: "pending",
    category: "Fornecedores"
  },
  { 
    id: 2, 
    description: "Aluguel - Maio/2025", 
    supplier: "Imobiliária Central", 
    value: 2800.00, 
    dueDate: "2025-05-15", 
    status: "pending",
    category: "Infraestrutura"
  },
  { 
    id: 3, 
    description: "Serviço de internet", 
    supplier: "Telecom X", 
    value: 199.90, 
    dueDate: "2025-05-20", 
    status: "paid",
    category: "Serviços"
  },
  { 
    id: 4, 
    description: "Contador - Maio/2025", 
    supplier: "Contabilidade Silva", 
    value: 450.00, 
    dueDate: "2025-05-10", 
    status: "overdue",
    category: "Serviços"
  },
  { 
    id: 5, 
    description: "Material de escritório", 
    supplier: "Papelaria Rápida", 
    value: 180.00, 
    dueDate: "2025-06-15", 
    status: "pending",
    category: "Materiais"
  }
];

const AccountsPayable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [payables, setPayables] = useState(mockPayables);

  const filteredPayables = payables.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Atrasado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Contas a Pagar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por descrição, fornecedor..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Filtrar</Button>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nova Conta a Pagar
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    Nenhuma conta a pagar encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayables.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">R$ {item.value.toFixed(2)}</TableCell>
                    <TableCell>{new Date(item.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsPayable;

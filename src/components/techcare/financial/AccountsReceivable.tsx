
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";

// Dados simulados
const mockReceivables = [
  { 
    id: 1, 
    description: "Venda de produtos - Pedido #12345", 
    customer: "João Silva", 
    value: 850.00, 
    dueDate: "2025-05-28", 
    status: "pending"
  },
  { 
    id: 2, 
    description: "Serviço de consultoria", 
    customer: "Empresa XYZ", 
    value: 1200.00, 
    dueDate: "2025-05-15", 
    status: "paid"
  },
  { 
    id: 3, 
    description: "Venda de produtos - Pedido #12346", 
    customer: "Maria Oliveira", 
    value: 320.00, 
    dueDate: "2025-06-10", 
    status: "pending"
  },
  { 
    id: 4, 
    description: "Assinatura mensal", 
    customer: "Carlos Mendes", 
    value: 89.90, 
    dueDate: "2025-05-20", 
    status: "pending"
  },
  { 
    id: 5, 
    description: "Serviço de personalização", 
    customer: "Ana Sousa", 
    value: 450.00, 
    dueDate: "2025-05-12", 
    status: "overdue"
  }
];

const AccountsReceivable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [receivables, setReceivables] = useState(mockReceivables);

  const filteredReceivables = receivables.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase())
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
        <CardTitle className="text-xl">Contas a Receber</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por descrição ou cliente..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Filtrar</Button>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nova Conta a Receber
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceivables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    Nenhuma conta a receber encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReceivables.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.description}</TableCell>
                    <TableCell>{item.customer}</TableCell>
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

export default AccountsReceivable;

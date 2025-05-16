
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Edit2, Trash2, BarChart2 } from "lucide-react";
import { EmailSequenceGroup } from "@/hooks/useEmailSequence";
import StatusBadge from "@/components/StatusBadge";

interface EmailSequenceCardProps {
  sequence: EmailSequenceGroup;
  onEdit: (sequence: EmailSequenceGroup) => void;
  onDelete: (id: string) => void;
  onViewStats: (sequence: EmailSequenceGroup) => void;
}

const EmailSequenceCard: React.FC<EmailSequenceCardProps> = ({
  sequence,
  onEdit,
  onDelete,
  onViewStats
}) => {
  const calculateCompletionRate = () => {
    if (!sequence.stats) return 0;
    return sequence.stats.enviados > 0
      ? Math.round((sequence.stats.abertos / sequence.stats.enviados) * 100)
      : 0;
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            {sequence.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {sequence.emails.length} emails na sequência
          </p>
        </div>
        <StatusBadge status={sequence.status} />
      </CardHeader>
      
      <CardContent className="pt-2">
        <p className="text-sm text-gray-400">
          {sequence.description || "Sem descrição disponível"}
        </p>
        
        {sequence.stats && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-900/50 py-2 px-1 rounded-md">
              <p className="text-xl font-bold text-blue-500">{sequence.stats.enviados}</p>
              <p className="text-xs text-gray-500">Enviados</p>
            </div>
            <div className="bg-gray-900/50 py-2 px-1 rounded-md">
              <p className="text-xl font-bold text-green-500">{sequence.stats.abertos}</p>
              <p className="text-xs text-gray-500">Abertos</p>
            </div>
            <div className="bg-gray-900/50 py-2 px-1 rounded-md">
              <p className="text-xl font-bold text-yellow-500">
                {calculateCompletionRate()}%
              </p>
              <p className="text-xs text-gray-500">Taxa de abertura</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onViewStats(sequence)}>
          <BarChart2 className="h-4 w-4 mr-1" /> Estatísticas
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(sequence)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(sequence.id)}
            className="text-red-500 hover:text-white hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmailSequenceCard;

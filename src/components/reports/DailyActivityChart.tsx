
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

const DailyActivityChart: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Atividade por Dia</CardTitle>
        <BarChart2 className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <div className="flex items-end justify-between w-full h-full px-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, i) => {
              const heights = [30, 65, 45, 80, 55, 40, 25];
              return (
                <div key={day} className="flex flex-col items-center space-y-2">
                  <div 
                    className="w-12 bg-blue-600 rounded-t-md" 
                    style={{ height: `${heights[i]}%` }}
                  ></div>
                  <span className="text-xs text-gray-400">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyActivityChart;

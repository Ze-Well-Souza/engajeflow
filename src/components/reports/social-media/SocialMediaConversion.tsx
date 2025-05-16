
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const SocialMediaConversion: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Taxa de Conversão</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Instagram</span>
                <span className="font-medium">3.2%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: "3.2%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Facebook</span>
                <span className="font-medium">2.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "2.8%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>YouTube</span>
                <span className="font-medium">4.5%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "4.5%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Leads por Fonte</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Instagram</span>
                <span className="font-medium">124</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: "48%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Facebook</span>
                <span className="font-medium">87</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "32%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>YouTube</span>
                <span className="font-medium">53</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaConversion;

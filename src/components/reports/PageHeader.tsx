
import React from "react";
import { Download, Filter } from "lucide-react";

type PageHeaderProps = {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-2">
        <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm">
          <option>Últimos 7 dias</option>
          <option>Últimos 30 dias</option>
          <option>Últimos 90 dias</option>
        </select>
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md">
          <Filter className="h-4 w-4" />
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white p-1.5 rounded-md">
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PageHeader;

import React from 'react';
import { FileText } from 'lucide-react';

export default function FileCard({ name, fileName }) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer group transition">
      <div className="flex items-center gap-3">
        <div className="bg-purple-100 p-2 rounded text-purple-600">
          <FileText size={18}/>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">{name}</div>
          <div className="text-xs text-gray-500">{fileName}</div>
        </div>
      </div>
      <div className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
        View
      </div>
    </div>
  );
}
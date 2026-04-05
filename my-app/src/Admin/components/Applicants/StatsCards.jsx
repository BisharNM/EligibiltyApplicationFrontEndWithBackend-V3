import React from 'react';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import { Clock } from '../Shared/Icons'; 

export default function StatsCards({ stats, onFilterClick, activeFilter }) {
  
  
  const getCardStyle = (filterName) => {
    const isActive = activeFilter === filterName;
    return `bg-white px-4 py-3 rounded-lg shadow-sm border transition cursor-pointer hover:shadow-md ${
      isActive ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
    }`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      
      
      <div 
        className={getCardStyle('ALL')}
        onClick={() => onFilterClick('ALL')}
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="text-blue-600" size={20}/>
          </div>
          <div>
            <span className="block text-xs text-gray-500 font-bold uppercase">Total</span>
            <span className="text-xl font-bold text-slate-800">{stats.total}</span>
          </div>
        </div>
      </div>
      
      {/* pending */}
      <div 
        className={getCardStyle('pending')}
        onClick={() => onFilterClick('pending')}
      >
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-lg">
            <Clock className="text-yellow-600" size={20}/>
          </div>
          <div>
            <span className="block text-xs text-gray-500 font-bold uppercase">Pending</span>
            <span className="text-xl font-bold text-yellow-600">{stats.pending}</span>
          </div>
        </div>
      </div>
      
      {/* Approved */}
      <div 
        className={getCardStyle('approved')}
        onClick={() => onFilterClick('approved')}
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <CheckCircle className="text-green-600" size={20}/>
          </div>
          <div>
            <span className="block text-xs text-gray-500 font-bold uppercase">Approved</span>
            <span className="text-xl font-bold text-green-600">{stats.approved}</span>
          </div>
        </div>
      </div>
      
      {/* Rejected */}
      <div 
        className={getCardStyle('rejected')}
        onClick={() => onFilterClick('rejected')}
      >
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <XCircle className="text-red-600" size={20}/>
          </div>
          <div>
            <span className="block text-xs text-gray-500 font-bold uppercase">Rejected</span>
            <span className="text-xl font-bold text-red-600">{stats.rejected}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
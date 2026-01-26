import React from 'react';

export default function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'hover:bg-slate-800 text-slate-300'
      }`}
    >
      {icon} 
      <span>{label}</span>
    </button>
  );
}
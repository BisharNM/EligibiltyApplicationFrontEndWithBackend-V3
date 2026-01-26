import React from 'react';

export default function MediumCheckboxes({ data, onToggle, label }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <span className="text-sm font-medium text-gray-700 min-w-[150px]">{label}</span>
      <div className="flex gap-4">
        {['sinhala', 'tamil', 'english'].map(med => (
          <label 
            key={med} 
            className="flex items-center gap-2 cursor-pointer hover:bg-white px-2 py-1 rounded transition"
          >
            <input 
              type="checkbox" 
              checked={data[med]} 
              onChange={() => onToggle(med)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm capitalize">{med}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
import React from 'react';

export default function ResultCard({ label, grade }) {
  return (
    <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`font-bold ${
        ['A','B'].includes(grade) ? 'text-green-600' : 'text-slate-700'
      }`}>
        {grade}
      </span>
    </div>
  );
}
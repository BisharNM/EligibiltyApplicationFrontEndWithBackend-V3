import React from 'react';

export default function StatsCard({ title, value, valueColor = 'text-slate-800' }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-gray-500 text-sm font-bold uppercase">{title}</h3>
      <p className={`text-4xl font-bold mt-2 ${valueColor}`}>{value}</p>
    </div>
  );
}
import React from 'react';

const QualSelect = ({ name, value, onChange, label }) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold text-gray-600 mb-1">{label}</label>
    <select 
      name={name} 
      value={value} 
      onChange={onChange} 
      className="border p-2 rounded text-sm w-full"
    >
      <option value="Fail">Fail / Not Taken</option>
      <option value="Pass">Pass</option>
    </select>
  </div>
);

export default QualSelect;
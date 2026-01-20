import React from 'react';

const GradeSelect = ({ name, value, onChange, label, includeW = false }) => (
  <div className="flex flex-col">
    {label && <label className="text-xs font-semibold text-gray-600 mb-1">{label}</label>}
    <select 
      name={name} 
      value={value} 
      onChange={onChange} 
      className="border p-2 rounded text-sm w-full"
    >
      {includeW && <option value="W">W (Weak/Fail)</option>}
      <option value="F">Fail / Absent</option>
      <option value="S">S (Pass)</option>
      <option value="C">C (Credit)</option>
      <option value="B">B (Very Good)</option>
      <option value="A">A (Distinction)</option>
    </select>
  </div>
);

export default GradeSelect;
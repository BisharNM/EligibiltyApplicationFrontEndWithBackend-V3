import React from 'react';
//co
const FileUpload = ({ label, name, onChange, required = false }) => (
  <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 transition">
    <label className="cursor-pointer block">
      <span className={`block text-sm font-semibold mb-2 ${required ? 'text-red-600' : 'text-gray-600'}`}>
        {label} {required && '*'}
      </span>
      <input 
        type="file" 
        name={name} 
        onChange={onChange} 
        required={required}
        className="text-xs" 
      />
    </label>
  </div>
);

export default FileUpload;


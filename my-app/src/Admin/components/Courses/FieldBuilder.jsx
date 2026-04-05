import React from 'react';
import { Plus, Trash2, GripVertical, FileText, Upload, CheckCircle } from 'lucide-react';
import { createEmptyConfig } from '../../utils/courseHelpers';

export default function FieldBuilder({ fields, onChange }) {
  
 
  const data = fields || [];

  const addField = () => {
    onChange([...data, createEmptyConfig()]);
  };

  const removeField = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateField = (index, key, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-orange-50 p-3 border-b border-orange-100 flex justify-between items-center">
        <h4 className="font-bold text-orange-900 flex items-center gap-2">
          <FileText size={16}/> Additional Qualification Fields
        </h4>
        <button 
          onClick={addField} 
          className="text-xs bg-orange-600 text-white px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-orange-700 transition"
        >
          <Plus size={14} /> Add Field
        </button>
      </div>

      <div className="p-4 space-y-4">
        {data.length === 0 && (
          <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-sm">No additional qualifications defined.</p>
            <p className="text-xs mt-1">Click "Add Field" to ask for certificates, memberships, etc.</p>
          </div>
        )}

        {data.map((field, idx) => (
          <div key={field.tempId || field.configId || idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group transition hover:border-orange-200">
            
            <div className="flex gap-4 items-start">
              
              <div className="mt-3 text-gray-300 cursor-move">
                <GripVertical size={18} />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* 1. Label Input */}
                <div className="md:col-span-6">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Field Label / Question
                  </label>
                  <input 
                    type="text" 
                    value={field.inputLabel}
                    onChange={(e) => updateField(idx, 'inputLabel', e.target.value)}
                    className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Upload Moulavi Certificate"
                  />
                </div>

                {/* 2. Type Select */}
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Input Type
                  </label>
                  <div className="relative">
                    <select 
                      value={field.inputType}
                      onChange={(e) => updateField(idx, 'inputType', e.target.value)}
                      className="w-full p-2 text-sm border rounded bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none appearance-none"
                    >
                      <option value="text">Text Box</option>
                      <option value="file">File Upload</option>
                      <option value="radio">Yes/No Radio</option>
                    </select>
                    {/* Icon based on type */}
                    <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                      {field.inputType === 'text' && <FileText size={14}/>}
                      {field.inputType === 'file' && <Upload size={14}/>}
                      {field.inputType === 'radio' && <CheckCircle size={14}/>}
                    </div>
                  </div>
                </div>

                {/* 3. File Count (Conditional) */}
                <div className="md:col-span-3">
                  {field.inputType === 'file' ? (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        File Limit
                      </label>
                      <select 
                        value={field.fileCountLimit}
                        onChange={(e) => updateField(idx, 'fileCountLimit', e.target.value)}
                        className="w-full p-2 text-sm border rounded bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                      >
                        <option value="1">1 File</option>
                        <option value="2">2 Files</option>
                        <option value="3">3 Files</option>
                        <option value="ANY">Unlimited</option>
                      </select>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-xs text-gray-300 italic mt-4">N/A</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Remove Button */}
              <button 
                onClick={() => removeField(idx)}
                className="mt-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                title="Remove Field"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
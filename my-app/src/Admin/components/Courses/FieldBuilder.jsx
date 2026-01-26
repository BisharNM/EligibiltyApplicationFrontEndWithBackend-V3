import React from 'react';
import { Plus, X } from 'lucide-react';

export default function FieldBuilder({ 
  title, 
  fields, 
  onUpdateTitle, 
  onAddField, 
  onRemoveField, 
  onUpdateField 
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
          Section Title (Student View)
        </label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => onUpdateTitle(e.target.value)}
          className="w-full p-2 border rounded font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g., Additional Qualifications"
        />
      </div>

      <div className="space-y-3">
        {fields.length === 0 && (
          <p className="text-sm text-gray-400 italic text-center py-4">
            No input fields defined. Click "Add Input Field" to start.
          </p>
        )}
        
        {fields.map((field) => (
          <div 
            key={field.id} 
            className="bg-slate-50 p-3 rounded border border-slate-200 relative group"
          >
            <button 
              onClick={() => onRemoveField(field.id)} 
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 bg-white p-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove field"
            >
              <X size={14}/>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="text-[10px] text-gray-400 uppercase font-bold">
                  Label / Question
                </label>
                <input 
                  type="text" 
                  value={field.label} 
                  onChange={(e) => onUpdateField(field.id, 'label', e.target.value)}
                  className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter field label"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold">
                  Input Type
                </label>
                <select 
                  value={field.type} 
                  onChange={(e) => onUpdateField(field.id, 'type', e.target.value)}
                  className="w-full p-1.5 text-sm border rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="text">Text Box</option>
                  <option value="radio">Yes/No Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="file">File Upload</option>
                </select>
              </div>
            </div>
            
            {field.type === 'file' && (
              <div className="mt-2">
                <label className="flex items-center gap-2 text-xs bg-white p-2 rounded border inline-block cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={field.allowMultiple} 
                    onChange={(e) => onUpdateField(field.id, 'allowMultiple', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  Allow Multiple Files?
                </label>
              </div>
            )}
          </div>
        ))}
        
        <button 
          onClick={onAddField} 
          className="w-full py-2 bg-blue-50 text-blue-600 rounded border border-dashed border-blue-300 hover:bg-blue-100 flex justify-center items-center gap-2 text-sm font-medium transition"
        >
          <Plus size={16}/> Add Input Field
        </button>
      </div>
    </div>
  );
}
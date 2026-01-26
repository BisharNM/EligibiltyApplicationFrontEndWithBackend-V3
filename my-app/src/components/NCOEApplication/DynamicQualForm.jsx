import React from 'react';
import { FileText, Upload } from 'lucide-react';

export default function DynamicQualForm({ configs, formData, onChange }) {
  
  if (!configs || configs.length === 0) return null;

  // Helper to determine how many inputs to render for files
  const getRenderCount = (limitStr) => {
    if (!limitStr || limitStr === "ANY") return 1;
    const num = parseInt(limitStr, 10);
    return isNaN(num) ? 1 : num;
  };

  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-bold text-blue-900 flex items-center mb-4">
        <FileText className="w-5 h-5 mr-2"/>
        Additional Qualifications
      </h3>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-6">
        {configs.map((config) => (
          <div key={config.configId} className="border-b border-blue-200 pb-4 last:border-0">
            
            {/* 1. Label */}
            <label className="block text-sm font-bold text-gray-800 mb-2">
              {config.inputLabel}
            </label>

            {/* 2. TEXT INPUT LOGIC */}
            {config.inputType === 'text' && (
              <input 
                type="text"
                name={`dynamic_${config.configId}`}
                value={formData[`dynamic_${config.configId}`] || ''}
                onChange={onChange}
                className="w-full p-2 border rounded text-sm bg-white"
                placeholder="Enter details..."
              />
            )}

            {/* 3. RADIO INPUT LOGIC (Assuming Yes/No if no options provided in DB) */}
            {config.inputType === 'radio' && (
              <div className="flex gap-4">
                <label className="flex items-center text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name={`dynamic_${config.configId}`}
                    value="Yes"
                    checked={formData[`dynamic_${config.configId}`] === 'Yes'}
                    onChange={onChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name={`dynamic_${config.configId}`}
                    value="No"
                    checked={formData[`dynamic_${config.configId}`] === 'No'}
                    onChange={onChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            )}

            {/* 4. FILE INPUT LOGIC (Handles File Count Limit) */}
            {config.inputType === 'file' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Create an array based on fileCountLimit (e.g. 2 -> [0, 1]) */}
                {[...Array(getRenderCount(config.fileCountLimit))].map((_, index) => (
                  <div key={index} className="border-2 border-dashed border-gray-300 bg-white p-3 rounded-lg hover:bg-gray-50 transition">
                    <label className="cursor-pointer block">
                      <div className="flex items-center text-xs font-semibold text-gray-500 mb-1">
                        <Upload className="w-3 h-3 mr-1"/>
                        {getRenderCount(config.fileCountLimit) > 1 
                          ? `Document Part ${index + 1}` 
                          : 'Upload Document'}
                      </div>
                      <input 
                        type="file" 
                        // Unique name: dynamic_ID_Index (e.g., dynamic_5_0, dynamic_5_1)
                        name={`dynamic_${config.configId}_file_${index}`}
                        onChange={onChange}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" 
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
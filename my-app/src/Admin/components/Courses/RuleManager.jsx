import React from 'react';
import { Plus, Trash2, AlertCircle, Check, Loader2, Layers } from 'lucide-react';
import { createEmptyAlRule, createEmptyOlRule } from '../../utils/courseHelpers';

export default function RuleManager({ type, rules, onChange, subjectOptions, isLoading }) {
  const isOL = type === 'OL';
  const data = rules || [];

  const addRule = () => {
    const newRule = isOL ? createEmptyOlRule() : createEmptyAlRule();
    onChange([...data, newRule]);
  };

  const removeRule = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateRule = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
          {type === 'AL' ? 'Advanced Level' : 'Ordinary Level'}
          <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-gray-200">
            {data.length}
          </span>
        </h4>
        <button 
          onClick={addRule} 
          className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
        >
          <Plus size={14} strokeWidth={3} /> Add Subject
        </button>
      </div>
      
      {/* Rules List */}
      <div className="space-y-3 flex-1">
        {data.length === 0 && (
          <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center p-4">
            <Layers className="text-gray-300 mb-2" size={24} />
            <p className="text-xs font-medium text-gray-500">No subject rules defined yet.</p>
            <button 
              onClick={addRule}
              className="mt-2 text-xs text-blue-600 font-bold hover:underline"
            >
              Add your first rule
            </button>
          </div>
        )}
        
        {data.map((rule, idx) => (
          <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-all group">
            <div className="flex flex-col gap-3">
              
              {/* Top Row Subject & Grade */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <select 
                    className="w-full p-2 pl-3 pr-8 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all appearance-none cursor-pointer"
                    value={isOL ? rule.olSubject : rule.alSubject}
                    onChange={(e) => updateRule(idx, isOL ? 'olSubject' : 'alSubject', e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="">Select Subject...</option>
                    {isLoading ? (
                      <option disabled>Loading subjects...</option>
                    ) : (
                      subjectOptions?.map((subj, sIdx) => (
                        <option key={sIdx} value={subj}>{subj}</option>
                      ))
                    )}
                  </select>
                  {isLoading && (
                    <div className="absolute right-3 top-2.5">
                      <Loader2 size={14} className="animate-spin text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="w-20">
                  <select 
                    className="w-full p-2 text-center text-sm font-bold text-gray-800 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none cursor-pointer"
                    value={rule.grade}
                    onChange={(e) => updateRule(idx, 'grade', e.target.value)}
                  >
                    <option value="S">S</option>
                    <option value="C">C</option>
                    <option value="B">B</option>
                    <option value="A">A</option>
                  </select>
                </div>
              </div>

              {/* Bottom Row Toggles & Delete */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex gap-2">
                  <ToggleChip 
                    label="Compulsory" 
                    active={rule.status} 
                    onClick={() => updateRule(idx, 'status', !rule.status)} 
                    color="red"
                  />
                  {isOL && (
                    <ToggleChip 
                      label="Bucket Subject" 
                      active={rule.isBucket} 
                      onClick={() => updateRule(idx, 'isBucket', !rule.isBucket)} 
                      color="purple"
                    />
                  )}
                </div>

                <button 
                  onClick={() => removeRule(idx)} 
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Remove Rule"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//  Toggle Chip 
const ToggleChip = ({ label, active, onClick, color }) => {
  const colors = {
    red: active ? "bg-red-100 text-red-700 border-red-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50",
    purple: active ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wide transition-all ${colors[color]}`}
    >
      {active && <Check size={10} strokeWidth={4} />}
      {label}
    </button>
  );
};
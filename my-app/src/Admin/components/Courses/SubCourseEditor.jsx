import React from 'react';
import { Type, Globe, CheckSquare, List, Puzzle, Settings2, Database } from 'lucide-react';
import QualCountManager from './QualCountManager';
import RuleManager from './RuleManager';
import FieldBuilder from './FieldBuilder'; 

export default function SubCourseEditor({ subCourse, onChange, alOptions, olOptions, isLoadingOptions }) {
  
  const handleUpdate = (field, value) => {
    onChange({ ...subCourse, [field]: value });
  };

  //  Medium Toggle Logic 
  const handleMediumToggle = (code) => {
    const currentStr = subCourse.mediumLanguage || "";
    const isActive = currentStr.includes(code);
    
    let newStr = "";
    // Rebuild string in fixed S->T->E order
    if (code === 'S' ? !isActive : currentStr.includes('S')) newStr += "S";
    if (code === 'T' ? !isActive : currentStr.includes('T')) newStr += "T";
    if (code === 'E' ? !isActive : currentStr.includes('E')) newStr += "E";

    handleUpdate('mediumLanguage', newStr);
  };

  const isMediumActive = (code) => (subCourse.mediumLanguage || "").includes(code);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/*  Section 1: Basic Config  */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">General Settings</h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Name Input */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase mb-2">
              <Type size={14} /> Sub-Course Name
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              value={subCourse.subCourseName}
              onChange={(e) => handleUpdate('subCourseName', e.target.value)}
              placeholder="e.g. Biological Science"
            />
          </div>

          {/* Medium Toggles */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
                <Globe size={14} /> Supported Mediums
              </label>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                <Database size={10} /> Code: <span className="font-mono font-bold text-blue-600">{subCourse.mediumLanguage || "-"}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {[
                { code: 'S', label: 'Sinhala', color: 'bg-green-100 text-green-700 border-green-200' },
                { code: 'T', label: 'Tamil', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                { code: 'E', label: 'English', color: 'bg-blue-100 text-blue-700 border-blue-200' }
              ].map(({ code, label, color }) => {
                const active = isMediumActive(code);
                return (
                  <button
                    key={code}
                    onClick={() => handleMediumToggle(code)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 ${
                      active 
                        ? `${color} shadow-sm ring-1 ring-inset ring-black/5` 
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${active ? 'bg-white border-transparent' : 'border-gray-300 bg-gray-50'}`}>
                      {active && <CheckSquare size={12} className="text-current" />}
                    </div>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Rules Engine  */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-2 bg-white">
            <Puzzle size={14} /> Eligibility Logic Engine
          </span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Qualification Counters */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1">
             <QualCountManager 
               counts={subCourse.qualificationCount} 
               onChange={(val) => handleUpdate('qualificationCount', val)}
             />
          </div>
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* A/L Rules */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
              <RuleManager 
                type="AL" 
                rules={subCourse.alRules} 
                onChange={(val) => handleUpdate('alRules', val)}
                subjectOptions={alOptions}
                isLoading={isLoadingOptions}
              />
            </div>

            {/* O/L Rules */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
              <RuleManager 
                type="OL" 
                rules={subCourse.olRules} 
                onChange={(val) => handleUpdate('olRules', val)}
                subjectOptions={olOptions}
                isLoading={isLoadingOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/*  Section 3: Form Builder  */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 mt-8">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-2 bg-white">
            <List size={14} /> Dynamic Form Fields
          </span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-inner">
          <FieldBuilder 
            fields={subCourse.additionalConfigs} 
            onChange={(newFields) => handleUpdate('additionalConfigs', newFields)}
          />
        </div>
      </div>

    </div>
  );
}
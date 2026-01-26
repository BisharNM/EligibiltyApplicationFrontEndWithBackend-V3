import React from 'react';
import { FileText, Info } from 'lucide-react';
import { MEDIUMS, AL_SUBJECTS_1, AL_SUBJECTS_2, AL_SUBJECTS_3, COURSES } from '../../constants';
import GradeSelect from './shared/GradeSelect';

const ALevelForm = ({ formData, onChange, activeTab, subTab }) => {
  
  // Helper to get the correct subject list based on the row number
  const getSubjectList = (num) => {
    if (num === 1) return AL_SUBJECTS_1;
    if (num === 2) return AL_SUBJECTS_2;
    return AL_SUBJECTS_3;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      
      {/* Header */}
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <FileText className="w-5 h-5 text-blue-700" />
        </div>
        <h3 className="text-lg font-bold text-blue-900">G.C.E A/L Results</h3>
      </div>
      
      <div className="p-6 space-y-6">
        
        {/* Top Row: Year, Z-Score, Medium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
            <select 
              name="alYear" 
              value={formData.alYear} 
              onChange={onChange} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            >
              <option value="">Select Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Z-Score</label>
            <input 
              required 
              type="number" 
              step="0.0001" 
              name="zScore" 
              value={formData.zScore}
              onChange={onChange} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              placeholder="e.g. 1.2500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Medium</label>
            <select 
              name="alMedium" 
              value={formData.alMedium} 
              onChange={onChange} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            >
              {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <label className="block text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
            Passed Subjects & Grades
          </label>
          
          <div className="space-y-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start sm:items-center">
                
                {/* Subject Dropdown (Takes up 8/12 columns on desktop) */}
                <div className="sm:col-span-8">
                  <select 
                    name={`alSubject${num}`} 
                    value={formData[`alSubject${num}`]} 
                    onChange={onChange} 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
                  >
                    <option value="">-- Select Subject {num} --</option>
                    {getSubjectList(num).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Grade Dropdown (Takes up 4/12 columns on desktop) */}
                <div className="sm:col-span-4">
                  <GradeSelect 
                    name={`alGrade${num}`} 
                    value={formData[`alGrade${num}`]} 
                    onChange={onChange} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditional: Art Ranking */}
        {activeTab === COURSES.ART && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
            <h4 className="text-sm font-bold text-yellow-800 mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2" /> Art Stream Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-yellow-700 uppercase mb-1">District</label>
                <select 
                  name="alDistrict" 
                  value={formData.alDistrict} 
                  onChange={onChange} 
                  className="w-full rounded-md border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2 border bg-white"
                >
                  <option value="">Select District</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kandy">Kandy</option>
                  {/* Add all districts here */}
                </select>
              </div>
              <div>
                 {/* GradeSelect handles its own label logic, but we pass a label here */}
                <GradeSelect 
                  name="alSubjectGrade" 
                  value={formData.alSubjectGrade} 
                  onChange={onChange} 
                  label={`Grade for ${subTab}`} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Conditional: English Literature */}
        {(activeTab === COURSES.LANGUAGE_LIT && subTab === 'English Language & Literature') && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-2/3">
                <label className="text-sm font-bold text-blue-900 block">
                  General English Grade
                </label>
                <p className="text-xs text-blue-700 mt-1">
                  Required if applying under clause 4.11.3 (General English + O/L English 'B')
                </p>
              </div>
              <div className="w-full sm:w-1/3">
                <GradeSelect 
                  name="alGenEnglishGrade" 
                  value={formData.alGenEnglishGrade} 
                  onChange={onChange} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ALevelForm;
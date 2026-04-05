import React from 'react';
import { FileText, Calendar, Hash, Globe, BookOpen } from 'lucide-react';
import GradeSelect from './shared/GradeSelect';

export default function ALevelForm({ formData, onChange, subjects1, subjects2, subjects3 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      
      {/* Header Section */}
      <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center">
        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg mr-3">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">G.C.E A/L Results</h3>
          <p className="text-xs text-gray-500">Enter your advanced level examination details</p>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        
        {/* Top Row: Year, Z-Score, Medium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Year Input */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-600 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" /> Year
            </label>
            <select 
              name="alYear" 
              value={formData.alYear} 
              onChange={onChange} 
              className="w-full rounded-lg border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all border outline-none"
            >
              <option value="">Select Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          
          {/* Z-Score Input */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-600 mb-2">
              <Hash className="w-4 h-4 mr-2 text-gray-400" /> Z-Score
            </label>
            <input 
              required 
              type="number" 
              step="0.0001" 
              name="zScore" 
              value={formData.zScore} 
              onChange={onChange} 
              placeholder="e.g. 1.2500"
              className="w-full rounded-lg border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all border outline-none placeholder:text-gray-300" 
            />
          </div>
          
          {/* Medium Input */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-600 mb-2">
              <Globe className="w-4 h-4 mr-2 text-gray-400" /> Medium
            </label>
            <select 
              name="alMedium" 
              value={formData.alMedium} 
              onChange={onChange} 
              className="w-full rounded-lg border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all border outline-none"
            >
              <option value="Sinhala">Sinhala</option>
              <option value="Tamil">Tamil</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="bg-gray-50/80 rounded-xl border border-gray-200 p-5">
          <div className="flex items-center mb-4">
            <BookOpen className="w-4 h-4 text-gray-500 mr-2" />
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Passed Subjects & Grades</h4>
          </div>

          <div className="space-y-4">
            <SubjectRow num="1" options={subjects1} formData={formData} onChange={onChange} />
            <SubjectRow num="2" options={subjects2} formData={formData} onChange={onChange} />
            <SubjectRow num="3" options={subjects3} formData={formData} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
}


const SubjectRow = ({ num, options, formData, onChange }) => (
  <div className="grid grid-cols-12 gap-4 items-start sm:items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
     
      {/* Subject Select: Spans 8 cols on desktop, 12 on mobile */}
     <div className="col-span-12 sm:col-span-8">
       <select 
         name={`alSubject${num}`} 
         onChange={onChange} 
         value={formData[`alSubject${num}`]} 
         className="w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border outline-none cursor-pointer"
       >
          <option value="">-- Select Subject {num} --</option>
          {options && options.map((sub) => (
              <option key={sub.id} value={sub.name}>
                  {sub.name}
              </option>
          ))}
       </select>
     </div>

     {/* Grade Select: Spans 4 cols on desktop, 12 on mobile */}
     <div className="col-span-12 sm:col-span-4">
       <GradeSelect 
         name={`alGrade${num}`} 
         value={formData[`alGrade${num}`]} 
         onChange={onChange} 
         
       />
     </div>
  </div>
);
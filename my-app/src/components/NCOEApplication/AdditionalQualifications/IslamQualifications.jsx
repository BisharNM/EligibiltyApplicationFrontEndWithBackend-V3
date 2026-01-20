import React from 'react';
import { FileText } from 'lucide-react';

const IslamQualifications = ({ formData, onChange }) => (
  <div className="border-t pt-6">
    <h3 className="section-title text-green-800">
      <FileText className="w-5 h-5 mr-2"/>
      Additional Qualifications (Islam)
    </h3>
    <p className="text-xs text-gray-500 mb-4 ml-1">
      Requirement: Pass both Al-Alim Exams (Prelim & Final) OR upload Moulavi Certificate.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-green-50 p-4 rounded-lg border border-green-200">
      
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-green-900 mb-2">
          Passed Al-Alim Preliminary Exam?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center text-xs">
            <input 
              type="radio" 
              name="islamAlimPrelim" 
              value="Yes" 
              checked={formData.islamAlimPrelim === 'Yes'} 
              onChange={onChange} 
              className="mr-1"
            /> 
            Yes
          </label>
          <label className="flex items-center text-xs">
            <input 
              type="radio" 
              name="islamAlimPrelim" 
              value="No" 
              checked={formData.islamAlimPrelim === 'No'} 
              onChange={onChange} 
              className="mr-1"
            /> 
            No
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-semibold text-green-900 mb-2">
          Passed Al-Alim Final Exam?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center text-xs">
            <input 
              type="radio" 
              name="islamAlimFinal" 
              value="Yes" 
              checked={formData.islamAlimFinal === 'Yes'} 
              onChange={onChange} 
              className="mr-1"
            /> 
            Yes
          </label>
          <label className="flex items-center text-xs">
            <input 
              type="radio" 
              name="islamAlimFinal" 
              value="No" 
              checked={formData.islamAlimFinal === 'No'} 
              onChange={onChange} 
              className="mr-1"
            /> 
            No
          </label>
        </div>
      </div>

      <div className="border-2 border-dashed border-green-300 p-4 rounded-lg text-center hover:bg-white transition">
        <label className="cursor-pointer block">
          <span className="block text-xs font-semibold text-green-800 mb-2">
            Moulavi Certificate
          </span>
          <input type="file" name="certMoulavi" onChange={onChange} className="text-[10px]" />
        </label>
      </div>

    </div>
  </div>
);

export default IslamQualifications;
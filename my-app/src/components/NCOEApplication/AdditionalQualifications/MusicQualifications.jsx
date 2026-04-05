
import React from 'react';
import { FileText } from 'lucide-react';

const WesternMusicQualifications = ({ formData, onChange }) => {
  return (
    <div className="border-t pt-6">
      <h3 className="section-title text-purple-800">
        <FileText className="w-5 h-5 mr-2"/>
        Additional Qualifications (Western Music)
      </h3>
      <p className="text-xs text-gray-500 mb-4 ml-1">
        Please answer if relevant to your eligibility pathway (Clauses 4.17.2 or 4.17.3).
      </p>
      
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        
       
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-purple-900 mb-2">
            Passed Grade 5 Western Music (Theory & Practical) from recognized institute?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="westernMusicGrade5" 
                value="Yes" 
                checked={formData.westernMusicGrade5 === 'Yes'} 
                onChange={onChange} 
                className="mr-1"
              /> Yes
            </label>
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="westernMusicGrade5" 
                value="No" 
                checked={formData.westernMusicGrade5 === 'No'} 
                onChange={onChange} 
                className="mr-1"
              /> No
            </label>
          </div>
        </div>

        
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-purple-900 mb-2">
            Passed Western Music as an <strong>Additional Subject</strong> at G.C.E (A/L)?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="alAdditionalWesternMusic" 
                value="Yes" 
                checked={formData.alAdditionalWesternMusic === 'Yes'} 
                onChange={onChange} 
                className="mr-1"
              /> Yes
            </label>
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="alAdditionalWesternMusic" 
                value="No" 
                checked={formData.alAdditionalWesternMusic === 'No'} 
                onChange={onChange} 
                className="mr-1"
              /> No
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WesternMusicQualifications;
import React from 'react';
import { FileText } from 'lucide-react';

const ICTQualifications = ({ formData, onChange }) => {
  return (
    <div className="border-t pt-6">
      <h3 className="section-title text-blue-800">
        <FileText className="w-5 h-5 mr-2"/>
        Additional Qualifications (ICT)
      </h3>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-blue-900 mb-2">
            Passed General Information Technology (GIT) in Grade 12? (For Priority Selection)
          </label>
          <div className="flex gap-4">
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="passedGIT" 
                value="Yes" 
                checked={formData.passedGIT === 'Yes'} 
                onChange={onChange} 
                className="mr-1"
              /> Yes
            </label>
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="passedGIT" 
                value="No" 
                checked={formData.passedGIT === 'No'} 
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

export default ICTQualifications;
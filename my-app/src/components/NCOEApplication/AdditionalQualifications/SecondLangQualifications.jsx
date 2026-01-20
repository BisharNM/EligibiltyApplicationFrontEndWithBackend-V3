import React from 'react';
import { FileText } from 'lucide-react';

const SecondLangQualifications = ({ formData, onChange, subTab }) => {
  const targetLang = subTab.includes('Sinhala') ? 'Tamil' : 'Sinhala';

  return (
    <div className="border-t pt-6">
      <h3 className="section-title text-blue-800">
        <FileText className="w-5 h-5 mr-2"/>
        Additional Qualifications (Second Language)
      </h3>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-blue-900 mb-2">
            Passed Advanced Course in {targetLang} (Dept. of Official Languages)?
            <br/>
            <span className="font-normal text-gray-600">(Select 'Yes' if you have this instead of O/L Second Language subject)</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="officialLangCourse" 
                value="Yes" 
                checked={formData.officialLangCourse === 'Yes'} 
                onChange={onChange} 
                className="mr-1"
              /> Yes
            </label>
            <label className="flex items-center text-xs">
              <input 
                type="radio" 
                name="officialLangCourse" 
                value="No" 
                checked={formData.officialLangCourse === 'No'} 
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

export default SecondLangQualifications;
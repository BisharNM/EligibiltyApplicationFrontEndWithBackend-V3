import React from 'react';
import { CheckCircle } from 'lucide-react';
import { COURSES } from '../../../constants';
import StandardOLForm from './StandardOLForm';
import PirivenaForm from './PirivenaForm';

const OLevelForm = ({ formData, onChange, activeTab, subTab }) => {
  return (
    <div className="border-t pt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="section-title">
          <CheckCircle className="w-5 h-5 mr-2"/>
          G.C.E O/L
        </h3>
        {activeTab === COURSES.RELIGION && subTab === 'Buddhism' && (
          <label className="flex items-center text-sm font-bold text-purple-700">
            <input 
              type="checkbox" 
              name="isPirivena" 
              checked={formData.isPirivena} 
              onChange={onChange} 
              className="mr-2"
            /> 
            Use Pirivena Results
          </label>
        )}
      </div>

      {formData.isPirivena && activeTab === COURSES.RELIGION && subTab === 'Buddhism' ? (
        <PirivenaForm formData={formData} onChange={onChange} />
      ) : (
        <StandardOLForm formData={formData} onChange={onChange} />
      )}
    </div>
  );
};

export default OLevelForm;
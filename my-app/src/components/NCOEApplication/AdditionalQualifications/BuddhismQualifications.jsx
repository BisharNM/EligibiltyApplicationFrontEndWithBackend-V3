import React from 'react';
import { FileText } from 'lucide-react';
import QualSelect from '../shared/QualSelect';

const BuddhismQualifications = ({ formData, onChange }) => (
  <div className="border-t pt-6">
    <h3 className="section-title text-orange-800">
      <FileText className="w-5 h-5 mr-2"/>
      Additional Qualifications (Buddhism)
    </h3>
    <p className="text-xs text-gray-500 mb-4 ml-1">
      Must pass at least one of the following examinations (4.5.3 - 4.5.5).
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-orange-50 p-4 rounded-lg border border-orange-200">
      <QualSelect 
        label="Bauddha Dharmacharya Examination" 
        name="examDharmacharya" 
        value={formData.examDharmacharya} 
        onChange={onChange} 
      />
      <QualSelect 
        label="Pracheena / Preliminary Examination" 
        name="examPracheena" 
        value={formData.examPracheena} 
        onChange={onChange} 
      />
      <QualSelect 
        label="Dhamma School Final Examination" 
        name="examDhammaSchool" 
        value={formData.examDhammaSchool} 
        onChange={onChange} 
      />
    </div>
  </div>
);

export default BuddhismQualifications;
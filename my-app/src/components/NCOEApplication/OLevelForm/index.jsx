import React from 'react';
import { CheckCircle } from 'lucide-react';
import { COURSES } from '../../../constants';
import StandardOLForm from './StandardOLForm';
import PirivenaForm from './PirivenaForm';

const OLevelForm = ({ formData, onChange, activeTab, subTab , bucket1, bucket2, bucket3}) => {
  return (
    <div className="border-t pt-6">
       {(formData.isPirivena && isPirivenaOptionAvailable) ? (
        <PirivenaForm formData={formData} onChange={onChange} />
      ) : (
        <StandardOLForm 
            formData={formData} 
            onChange={onChange}
            // Pass buckets here
            bucket1={bucket1}
            bucket2={bucket2}
            bucket3={bucket3}
        />
      )}
    </div>
  );
};

export default OLevelForm;
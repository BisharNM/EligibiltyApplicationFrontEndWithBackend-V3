import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const ValidationSummary = ({ errors, canApply }) => {
  if (errors.length > 0) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
        <div className="flex items-center mb-2">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="font-bold text-red-700">Not Eligible</p>
        </div>
        <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r flex items-center">
      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
      <p className="font-bold text-green-700">Eligible to Apply!</p>
    </div>
  );
};

export default ValidationSummary;
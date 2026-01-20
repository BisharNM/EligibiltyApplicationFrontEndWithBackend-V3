import React from 'react';
import { getPirivenaStats } from '../../../utils/helpers';
import GradeSelect from '../shared/GradeSelect';

const PirivenaForm = ({ formData, onChange }) => {
  const stats = getPirivenaStats(formData);

  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <h4 className="text-sm font-bold text-purple-900 mb-4 border-b border-purple-200 pb-2">
        Preliminary Pirivena Final Examination
      </h4>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-purple-200">
          <thead className="text-xs text-purple-900 uppercase bg-purple-100 border-b border-purple-200">
            <tr>
              <th className="px-4 py-2 w-1/2">Subject</th>
              <th className="px-4 py-2 w-1/2">Result</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">(i) Sinhala</td>
              <td className="px-4 py-2">
                <GradeSelect name="pirivenaSinhala" value={formData.pirivenaSinhala} onChange={onChange} includeW />
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">(ii) Pali</td>
              <td className="px-4 py-2">
                <GradeSelect name="pirivenaPali" value={formData.pirivenaPali} onChange={onChange} includeW />
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">(iii) Sanskrit</td>
              <td className="px-4 py-2">
                <GradeSelect name="pirivenaSanskrit" value={formData.pirivenaSanskrit} onChange={onChange} includeW />
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">(iv) English</td>
              <td className="px-4 py-2">
                <GradeSelect name="pirivenaEnglish" value={formData.pirivenaEnglish} onChange={onChange} includeW />
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">(v) Mathematics</td>
              <td className="px-4 py-2">
                <GradeSelect name="pirivenaMath" value={formData.pirivenaMath} onChange={onChange} includeW />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">(vi) Thripitaka Dhamma</td>
              <td className="px-4 py-2">
                <GradeSelect name="pirivenaDhamma" value={formData.pirivenaDhamma} onChange={onChange} includeW />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-2 bg-purple-100 text-xs text-purple-900 rounded flex gap-4">
        <span>Total Passes: <b>{stats.passes}</b></span>
        <span>Total Credits: <b>{stats.credits}</b></span>
      </div>
    </div>
  );
};

export default PirivenaForm;
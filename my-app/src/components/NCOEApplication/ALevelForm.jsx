import React from 'react';
import { FileText } from 'lucide-react';
import { MEDIUMS, AL_SUBJECTS_1, AL_SUBJECTS_2, AL_SUBJECTS_3, COURSES } from '../../constants';
import GradeSelect from './shared/GradeSelect';

const ALevelForm = ({ formData, onChange, activeTab, subTab }) => {
  return (
    <div className="border-t pt-6">
      <h3 className="section-title">
        <FileText className="w-5 h-5 mr-2"/>
        G.C.E A/L Results
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="label-text">Year</label>
          <select name="alYear" value={formData.alYear} onChange={onChange} className="input-field">
            <option value="">Select</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        
        <div>
          <label className="label-text">Z-Score</label>
          <input 
            required 
            type="number" 
            step="0.0001" 
            name="zScore" 
            value={formData.zScore}
            onChange={onChange} 
            className="input-field" 
            placeholder="e.g. 1.2500" 
          />
        </div>
        
        <div>
          <label className="label-text">A/L Medium</label>
          <select name="alMedium" value={formData.alMedium} onChange={onChange} className="input-field">
            {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Subjects */}
      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Passed Subjects & Grades
        </label>
        <div className="grid grid-cols-1 gap-3">
          
          {/* Subject 1 */}
          <div className="flex gap-2 items-center">
            <div className="w-2/3">
              <select name="alSubject1" value={formData.alSubject1} onChange={onChange} className="input-field mt-0">
                <option value="">-- Select Subject 1 --</option>
                {AL_SUBJECTS_1.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="w-1/3">
              <GradeSelect name="alGrade1" value={formData.alGrade1} onChange={onChange} />
            </div>
          </div>

          {/* Subject 2 */}
          <div className="flex gap-2 items-center">
            <div className="w-2/3">
              <select name="alSubject2" value={formData.alSubject2} onChange={onChange} className="input-field mt-0">
                <option value="">-- Select Subject 2 --</option>
                {AL_SUBJECTS_2.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="w-1/3">
              <GradeSelect name="alGrade2" value={formData.alGrade2} onChange={onChange} />
            </div>
          </div>

          {/* Subject 3 */}
          <div className="flex gap-2 items-center">
            <div className="w-2/3">
              <select name="alSubject3" value={formData.alSubject3} onChange={onChange} className="input-field mt-0">
                <option value="">-- Select Subject 3 --</option>
                {AL_SUBJECTS_3.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="w-1/3">
              <GradeSelect name="alGrade3" value={formData.alGrade3} onChange={onChange} />
            </div>
          </div>

        </div>
      </div>

      {/* Art Specific */}
      {activeTab === COURSES.ART && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 mt-4 rounded-lg">
          <h4 className="text-sm font-bold text-yellow-800 mb-2">Art Ranking Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-text">District</label>
              <select name="alDistrict" value={formData.alDistrict} onChange={onChange} className="input-field">
                <option value="">Select District</option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kandy">Kandy</option>
                {/* Add more districts */}
              </select>
            </div>
            <GradeSelect 
              name="alSubjectGrade" 
              value={formData.alSubjectGrade} 
              onChange={onChange} 
              label={`Grade for ${subTab}`} 
            />
          </div>
        </div>
      )}
      {(activeTab === COURSES.LANGUAGE_LIT && subTab === 'English Language & Literature') && (
  <div className="mt-4 pt-4 border-t border-gray-200">
    <div className="flex gap-2 items-center">
      <div className="w-2/3 text-sm font-bold text-gray-700">
        General English Grade (Required for Path 3)
      </div>
      <div className="w-1/3">
        <GradeSelect 
          name="alGenEnglishGrade" 
          value={formData.alGenEnglishGrade} 
          onChange={onChange} 
        />
      </div>
    </div>
    <p className="text-xs text-gray-500 mt-1">
      * Required if you are applying under clause 4.11.3 (General English + O/L English 'B')
    </p>
  </div>
)}
    </div>
  );
};

export default ALevelForm;
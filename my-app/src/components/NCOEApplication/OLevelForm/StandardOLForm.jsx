import React from 'react';
import { BookOpen, Calculator, Globe, Clock, Layers } from 'lucide-react';
import { MEDIUMS, OL_RELIGIONS } from '../../../constants';
import { getOLStats } from '../../../utils/helpers';
import GradeSelect from '../shared/GradeSelect';

const StandardOLForm = ({ formData, onChange, bucket1, bucket2, bucket3 }) => {
  const stats = getOLStats(formData);

  return (
    <div className="space-y-6">
      
      {/* Configuration Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        
        {/* Medium Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Medium of Examination</label>
          <select 
            name="olMedium" 
            value={formData.olMedium} 
            onChange={onChange} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
          >
            {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Attempt Selector (Toggle) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Attempt Number</label>
          <div className="grid grid-cols-2 gap-2">
            {['1', '2'].map((attempt) => (
              <label 
                key={attempt}
                className={`cursor-pointer text-center p-2.5 rounded-md border text-sm font-medium transition-all ${
                  formData.olAttempt === attempt 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="radio" 
                  name="olAttempt" 
                  value={attempt} 
                  checked={formData.olAttempt === attempt} 
                  onChange={onChange} 
                  className="hidden"
                /> 
                {attempt === '1' ? '1st Attempt' : '2nd Attempt'}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Core Subjects Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
          <BookOpen className="w-4 h-4 text-gray-500 mr-2" />
          <h4 className="font-bold text-gray-700 text-sm uppercase">Core Subjects</h4>
        </div>
        
        <div className="divide-y divide-gray-100">
          {/* Religion (Dynamic) */}
          <div className="p-4 flex flex-col sm:flex-row items-center gap-4 hover:bg-gray-50 transition-colors">
            <div className="w-full sm:w-2/3">
              <label className="text-sm font-medium text-gray-900 block mb-1 sm:mb-0">Religion Subject</label>
              <select 
                name="olReligionSubject" 
                onChange={onChange} 
                value={formData.olReligionSubject} 
                className="w-full mt-1 sm:mt-0 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1.5"
              >
                <option value="">-- Select Religion --</option>
                {OL_RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="w-full sm:w-1/3">
              <GradeSelect name="olReligion" value={formData.olReligion} onChange={onChange} includeW />
            </div>
          </div>
          
          {/* First Language & Literature (Replaces "Medium Language") */}
          <div className="p-4 flex flex-col sm:flex-row items-center gap-4 hover:bg-gray-50 transition-colors">
            <div className="w-full sm:w-2/3">
              <label className="text-sm font-medium text-gray-900 block mb-1 sm:mb-0">First Language & Literature</label>
              <select 
                name="olFirstLang" 
                onChange={onChange} 
                value={formData.olFirstLang} 
                className="w-full mt-1 sm:mt-0 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1.5"
              >
                <option value="">-- Select Language --</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3">
              <GradeSelect name="olLang" value={formData.olLang} onChange={onChange} includeW />
            </div>
          </div>

          <StaticSubjectRow label="Mathematics" icon={Calculator} name="olMath" val={formData.olMath} onChange={onChange} />
          <StaticSubjectRow label="Science" icon={BookOpen} name="olScience" val={formData.olScience} onChange={onChange} />
          <StaticSubjectRow label="English" icon={Globe} name="olEnglish" val={formData.olEnglish} onChange={onChange} />
          <StaticSubjectRow label="History" icon={Clock} name="olHistory" val={formData.olHistory} onChange={onChange} />
        </div>
      </div>

      {/* Basket Subjects Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
          <Layers className="w-4 h-4 text-gray-500 mr-2" />
          <h4 className="font-bold text-gray-700 text-sm uppercase">Basket Subjects</h4>
        </div>
        <div className="divide-y divide-gray-100">
          <BucketRow 
             label="Category Subject 1"
             subName="olBucket1Sub" 
             gradeName="olBucket1Grade"
             subValue={formData.olBucket1Sub} 
             gradeValue={formData.olBucket1Grade}
             options={bucket1} 
             cb={onChange} 
          />
          
          <BucketRow 
             label="Category Subject 2"
             subName="olBucket2Sub" 
             gradeName="olBucket2Grade"
             subValue={formData.olBucket2Sub} 
             gradeValue={formData.olBucket2Grade}
             options={bucket2} 
             cb={onChange} 
          />
          
          <BucketRow 
             label="Category Subject 3"
             subName="olBucket3Sub" 
             gradeName="olBucket3Grade"
             subValue={formData.olBucket3Sub} 
             gradeValue={formData.olBucket3Grade}
             options={bucket3} 
             cb={onChange} 
          />
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <span className="block text-xs font-bold text-green-600 uppercase tracking-wide">Total Passes</span>
          <span className="text-2xl font-bold text-green-700">{stats.passes}</span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <span className="block text-xs font-bold text-blue-600 uppercase tracking-wide">Total Credits</span>
          <span className="text-2xl font-bold text-blue-700">{stats.credits}</span>
        </div>
      </div>

      {/* 2nd Attempt Specifics */}
      {formData.olAttempt === '2' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
          <h4 className="text-sm font-bold text-red-800 mb-3 flex items-center">
            ⚠️ 1st Attempt Prerequisites
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-red-700 uppercase mb-1">Passes (1st Att.)</label>
              <input 
                type="number" 
                name="olAtt1Passes" 
                value={formData.olAtt1Passes}
                onChange={onChange} 
                className="w-full rounded-md border-red-300 focus:border-red-500 focus:ring-red-500 text-sm p-2 border"
                placeholder="Count"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-red-700 uppercase mb-1">Credits (1st Att.)</label>
              <input 
                type="number" 
                name="olAtt1Credits" 
                value={formData.olAtt1Credits}
                onChange={onChange} 
                className="w-full rounded-md border-red-300 focus:border-red-500 focus:ring-red-500 text-sm p-2 border"
                placeholder="Count"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-red-700 uppercase mb-1">Language Grade</label>
              <GradeSelect 
                name="olAtt1Lang" 
                value={formData.olAtt1Lang} 
                onChange={onChange} 
                includeW
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//  Helper Components 

const StaticSubjectRow = ({ label, icon: Icon, name, val, onChange }) => (
  <div className="p-4 flex flex-col sm:flex-row items-center gap-4 hover:bg-gray-50 transition-colors">
    <div className="w-full sm:w-2/3 flex items-center">
      {Icon && <Icon className="w-4 h-4 text-gray-400 mr-2 hidden sm:block" />}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div className="w-full sm:w-1/3">
      <GradeSelect name={name} value={val} onChange={onChange} includeW />
    </div>
  </div>
);

const BucketRow = ({ label, subName, gradeName, subValue, gradeValue, options, cb }) => (
  <div className="p-4 flex flex-col sm:flex-row items-center gap-4 hover:bg-gray-50 transition-colors">
    <div className="w-full sm:w-2/3">
       <label className="block text-xs text-gray-500 mb-1 sm:hidden">{label}</label>
       <select 
              name={subName} 
              value={subValue} 
              onChange={cb} 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2"
           >
              <option value="">-- Select Subject ({label}) --</option>
              {options && options.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
              ))}
           </select>
    </div>
    <div className="w-full sm:w-1/3">
       <GradeSelect name={gradeName} value={gradeValue} onChange={cb} />
    </div>
  </div>
);

export default StandardOLForm;
import React from 'react';
import { MEDIUMS, OL_RELIGIONS, BUCKET_1, BUCKET_2, BUCKET_3 } from '../../../constants';
import { getOLStats } from '../../../utils/helpers';
import GradeSelect from '../shared/GradeSelect';

const StandardOLForm = ({ formData, onChange }) => {
  const stats = getOLStats(formData);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="mb-4 w-full md:w-1/2">
        <label className="label-text">Medium of O/L Examination</label>
        <select name="olMedium" value={formData.olMedium} onChange={onChange} className="input-field">
          {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="flex gap-4 mb-4">
        <label>
          <input 
            type="radio" 
            name="olAttempt" 
            value="1" 
            checked={formData.olAttempt === '1'} 
            onChange={onChange} 
            className="mr-1"
          /> 
          1st Attempt
        </label>
        <label>
          <input 
            type="radio" 
            name="olAttempt" 
            value="2" 
            checked={formData.olAttempt === '2'} 
            onChange={onChange} 
            className="mr-1"
          /> 
          2nd Attempt
        </label>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 w-1/2">Subject</th>
              <th className="px-4 py-2 w-1/2">Result / Grade</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            
            <tr className="border-b">
              <td className="px-4 py-2 font-medium">
                <select 
                  name="olReligionSubject" 
                  onChange={onChange} 
                  value={formData.olReligionSubject} 
                  className="border p-1 rounded w-full bg-white"
                >
                  <option value="">-- Select Religion Subject --</option>
                  {OL_RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </td>
              <td className="px-4 py-2">
                <GradeSelect name="olReligion" value={formData.olReligion} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Medium Language</td>
              <td className="px-4 py-2">
                <GradeSelect name="olLang" value={formData.olLang} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 font-medium">History</td>
              <td className="px-4 py-2">
                <GradeSelect name="olHistory" value={formData.olHistory} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Mathematics</td>
              <td className="px-4 py-2">
                <GradeSelect name="olMath" value={formData.olMath} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 font-medium">Science</td>
              <td className="px-4 py-2">
                <GradeSelect name="olScience" value={formData.olScience} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 font-medium">English</td>
              <td className="px-4 py-2">
                <GradeSelect name="olEnglish" value={formData.olEnglish} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="border-b bg-gray-50">
              <td className="px-4 py-2">
                <select name="olBucket1Sub" value={formData.olBucket1Sub} onChange={onChange} className="border p-1 rounded w-full bg-white">
                  <option value="">-- Basket 1 --</option>
                  {BUCKET_1.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="px-4 py-2">
                <GradeSelect name="olBucket1Grade" value={formData.olBucket1Grade} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="border-b bg-gray-50">
              <td className="px-4 py-2">
                <select name="olBucket2Sub" value={formData.olBucket2Sub} onChange={onChange} className="border p-1 rounded w-full bg-white">
                  <option value="">-- Basket 2 --</option>
                  {BUCKET_2.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="px-4 py-2">
                <GradeSelect name="olBucket2Grade" value={formData.olBucket2Grade} onChange={onChange} includeW />
              </td>
            </tr>

            <tr className="bg-gray-50">
              <td className="px-4 py-2">
                <select name="olBucket3Sub" value={formData.olBucket3Sub} onChange={onChange} className="border p-1 rounded w-full bg-white">
                  <option value="">-- Basket 3 --</option>
                  {BUCKET_3.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td className="px-4 py-2">
                <GradeSelect name="olBucket3Grade" value={formData.olBucket3Grade} onChange={onChange} includeW />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-2 bg-blue-50 text-xs text-blue-800 rounded flex gap-4">
        <span>Total Passes: <b>{stats.passes}</b></span>
        <span>Total Credits: <b>{stats.credits}</b></span>
      </div>
      
      {formData.olAttempt === '2' && (
        <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded">
          <h4 className="text-xs font-bold text-red-800 mb-2">1st Attempt Results Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label-text">1st Att. Passes</label>
              <input 
                type="number" 
                name="olAtt1Passes" 
                value={formData.olAtt1Passes}
                onChange={onChange} 
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">1st Att. Credits</label>
              <input 
                type="number" 
                name="olAtt1Credits" 
                value={formData.olAtt1Credits}
                onChange={onChange} 
                className="input-field"
              />
            </div>
            <GradeSelect 
              name="olAtt1Lang" 
              value={formData.olAtt1Lang} 
              onChange={onChange} 
              label="1st Att. Lang" 
              includeW
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StandardOLForm;
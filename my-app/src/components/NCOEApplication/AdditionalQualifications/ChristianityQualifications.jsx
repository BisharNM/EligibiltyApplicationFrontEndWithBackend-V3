import React from 'react';
import { FileText } from 'lucide-react';

const ChristianityQualifications = ({ formData, onChange }) => (
  <div className="border-t pt-6">
    <h3 className="section-title text-blue-800">
      <FileText className="w-5 h-5 mr-2"/>
      Additional Qualifications (Christianity / Catholicism)
    </h3>
    
    <div className="mb-4 mt-2">
      <label className="block text-sm font-bold text-gray-700 mb-2">Select Denomination:</label>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input 
            type="radio" 
            name="christianDenomination" 
            value="Catholic" 
            checked={formData.christianDenomination === 'Catholic'} 
            onChange={onChange} 
            className="mr-2"
          /> 
          Catholic
        </label>
        <label className="flex items-center">
          <input 
            type="radio" 
            name="christianDenomination" 
            value="Christian" 
            checked={formData.christianDenomination === 'Christian'} 
            onChange={onChange} 
            className="mr-2"
          /> 
          Christian
        </label>
      </div>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-4">
      
      {/* Identity Certificates (Required) */}
      <div className="border-2 border-dashed border-blue-300 p-4 rounded-lg bg-white">
        <label className="cursor-pointer block text-center">
          <span className="block text-xs font-bold text-red-600 mb-1">
            {formData.christianDenomination === 'Catholic' 
              ? "Bishop's Certificate (Required)" 
              : "National Christian Council Certificate (Required)"}
          </span>
          <input 
            type="file" 
            name={formData.christianDenomination === 'Catholic' ? "certBishop" : "certNCC"} 
            onChange={onChange} 
            className="text-xs" 
          />
        </label>
      </div>

      {/* Priority Qualifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.christianDenomination === 'Catholic' ? (
          <>
            <div className="p-2 border rounded bg-white">
              <label className="text-xs font-semibold block mb-1">
                4-Year Theology Course (National Seminary)
              </label>
              <input type="file" name="certTheology4Yr" onChange={onChange} className="text-[10px] w-full"/>
            </div>
            <div className="p-2 border rounded bg-white">
              <label className="text-xs font-semibold block mb-1">
                Philosophy Course (National Seminary)
              </label>
              <input type="file" name="certPhilosophy" onChange={onChange} className="text-[10px] w-full"/>
            </div>
            <div className="p-2 border rounded bg-white">
              <label className="text-xs font-semibold block mb-1">
                Deva Dharma Nikethanaya (3 Year)
              </label>
              <input type="file" name="certDevaDharma" onChange={onChange} className="text-[10px] w-full"/>
            </div>
            <div className="p-2 border rounded bg-white">
              <label className="text-xs font-semibold block mb-1">
                Novitiate Certificate (Clergy)
              </label>
              <input type="file" name="certNovitiate" onChange={onChange} className="text-[10px] w-full"/>
            </div>
            <div className="p-2 border rounded bg-white col-span-2">
              <label className="text-xs font-semibold block mb-1">Catholic Dharma Guru Exam</label>
              <select 
                name="examDahamguru" 
                value={formData.examDahamguru} 
                onChange={onChange} 
                className="border p-1 rounded text-xs w-full"
              >
                <option value="None">None</option>
                <option value="1">Dahamguru 1 (Preliminary)</option>
                <option value="2">Dahamguru 2 (Medium)</option>
                <option value="3">Dahamguru 3 (Final)</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="p-2 border rounded bg-white">
              <label className="text-xs font-semibold block mb-1">
                Bachelor of Theology (Pilimatalawa)
              </label>
              <input type="file" name="certBachelorTheology" onChange={onChange} className="text-[10px] w-full"/>
            </div>
            <div className="p-2 border rounded bg-white">
              <label className="text-xs font-semibold block mb-1">
                Diploma in Theology (Pilimatalawa)
              </label>
              <input type="file" name="certDiplomaTheology" onChange={onChange} className="text-[10px] w-full"/>
            </div>
            <div className="p-2 border rounded bg-white col-span-2">
              <label className="text-xs font-semibold block mb-1">
                Religious Knowledge (Dharmacharya - NCC)
              </label>
              <input type="file" name="certReligiousKnowledge" onChange={onChange} className="text-[10px] w-full"/>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

export default ChristianityQualifications;
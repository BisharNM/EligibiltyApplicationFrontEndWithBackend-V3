import React from 'react';
import { FileText } from 'lucide-react';

const HinduismQualifications = ({ formData, onChange }) => (
  <div className="border-t pt-6">
    <h3 className="section-title text-pink-800">
      <FileText className="w-5 h-5 mr-2"/>
      Additional Qualifications (Hinduism)
    </h3>
    <p className="text-xs text-gray-500 mb-4 ml-1">
      Upload at least one of the following certificates (4.6.3 - 4.6.5).
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-pink-50 p-4 rounded-lg border border-pink-200">
      <div className="border-2 border-dashed border-pink-300 p-4 rounded-lg text-center hover:bg-white transition">
        <label className="cursor-pointer block">
          <span className="block text-xs font-semibold text-pink-800 mb-2">
            Shaiva Siddhantha Pandithar
          </span>
          <input type="file" name="certShaivaSiddhantha" onChange={onChange} className="text-[10px]" />
        </label>
      </div>
      
      <div className="border-2 border-dashed border-pink-300 p-4 rounded-lg text-center hover:bg-white transition">
        <label className="cursor-pointer block">
          <span className="block text-xs font-semibold text-pink-800 mb-2">
            Shaiva Pulaver Certificate
          </span>
          <input type="file" name="certShaivaPulaver" onChange={onChange} className="text-[10px]" />
        </label>
      </div>

      <div className="border-2 border-dashed border-pink-300 p-4 rounded-lg text-center hover:bg-white transition">
        <label className="cursor-pointer block">
          <span className="block text-xs font-semibold text-pink-800 mb-2">
            Ilang Shaiva Pulaver Certificate
          </span>
          <input type="file" name="certIlangShaiva" onChange={onChange} className="text-[10px]" />
        </label>
      </div>
    </div>
  </div>
);

export default HinduismQualifications;